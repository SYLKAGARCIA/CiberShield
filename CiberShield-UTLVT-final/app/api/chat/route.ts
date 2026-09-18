import { NextRequest, NextResponse } from 'next/server';

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

const SYSTEM_INSTRUCTION = `Eres CiberShield IA, el asistente educativo de la plataforma CiberShield UTLVT.
Tu propósito es ayudar a estudiantes universitarios a aprender y practicar conceptos de ciberseguridad de forma clara, responsable y sencilla.

Áreas principales: ingeniería social, phishing, software malicioso, contraseñas, seguridad de cuentas, navegación segura, privacidad, amenazas y buenas prácticas.

Reglas:
- Responde en español, salvo que el usuario pida otro idioma.
- Explica los conceptos paso a paso y con ejemplos educativos.
- Prioriza la prevención, detección y respuesta segura.
- No proporciones instrucciones para vulnerar sistemas, robar credenciales, crear malware, evadir controles de seguridad o realizar actividades ilegales.
- Si una pregunta pide una acción peligrosa o ilegal, explica brevemente que no puedes ayudar con esa parte y ofrece una alternativa educativa y defensiva.
- No inventes datos sobre la UTLVT ni afirmes que tienes acceso a cuentas, bases de datos o sistemas internos.
- Mantén respuestas útiles y relativamente breves.`;

type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'El chatbot todavía no está configurado. Agrega GEMINI_API_KEY en el archivo .env y reinicia el servidor.',
      },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];

    const messages: ChatMessage[] = rawMessages
      .filter(
        (message: unknown): message is ChatMessage =>
          !!message &&
          typeof message === 'object' &&
          'role' in message &&
          'text' in message &&
          ((message as ChatMessage).role === 'user' ||
            (message as ChatMessage).role === 'model') &&
          typeof (message as ChatMessage).text === 'string',
      )
      .slice(-MAX_MESSAGES)
      .map((message: ChatMessage) => ({
        role: message.role,
        text: message.text.trim().slice(0, MAX_MESSAGE_LENGTH),
      }))
      .filter((message: ChatMessage) => message.text.length > 0);

    if (!messages.length || messages[messages.length - 1].role !== 'user') {
      return NextResponse.json({ error: 'No se recibió una pregunta válida.' }, { status: 400 });
    }

    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents: messages.map((message) => ({
        role: message.role,
        parts: [{ text: message.text }],
      })),
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 700,
      },
    });

    async function llamarGemini() {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
        cache: 'no-store',
      });
      return { resp, data: await resp.json() };
    }

    function estaSaturado(resp: Response, data: unknown) {
      const mensaje = (data as { error?: { message?: string } })?.error?.message ?? '';
      return resp.status === 503 || /overloaded|high demand/i.test(mensaje);
    }

    let { resp: response, data } = await llamarGemini();

    // El modelo (sobre todo los "preview") a veces se satura por demanda.
    // Reintentamos una sola vez tras una breve espera antes de darnos por vencidos.
    if (!response.ok && estaSaturado(response, data)) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      ({ resp: response, data } = await llamarGemini());
    }

    if (!response.ok) {
      console.error('Gemini API error:', data);
      if (estaSaturado(response, data)) {
        return NextResponse.json(
          {
            error:
              'El modelo de IA está saturado por demanda ahora mismo (ya lo intenté dos veces). Espera un momento y vuelve a intentarlo.',
          },
          { status: 503 },
        );
      }
      const detalle = data?.error?.message || data?.error?.status || `HTTP ${response.status}`;
      return NextResponse.json(
        { error: `No pude conectar con el servicio de IA (${detalle}).` },
        { status: 502 },
      );
    }

    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || '')
      .join('')
      .trim();

    if (!text) {
      const motivo = data?.promptFeedback?.blockReason || data?.candidates?.[0]?.finishReason;
      return NextResponse.json(
        {
          error: motivo
            ? `La IA no devolvió una respuesta (motivo: ${motivo}). Prueba reformular la pregunta.`
            : 'La IA no devolvió una respuesta. Intenta nuevamente.',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar tu pregunta.' },
      { status: 500 },
    );
  }
}
