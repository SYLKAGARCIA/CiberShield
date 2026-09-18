'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChevronDown, Loader2, MessageCircle, Send, ShieldCheck, X } from 'lucide-react';

type Message = {
  role: 'user' | 'model';
  text: string;
};

const initialMessage: Message = {
  role: 'model',
  text: '¡Hola! Soy CiberShield IA 👋. Puedo ayudarte a aprender sobre ciberseguridad, phishing, ingeniería social, software malicioso, contraseñas y buenas prácticas. ¿Qué quieres aprender?',
};

const suggestions = ['¿Qué es el phishing?', '¿Cómo protejo mi cuenta?', '¿Qué es el malware?'];

export function CiberShieldChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(event?: FormEvent, suggestion?: string) {
    event?.preventDefault();
    const text = (suggestion ?? input).trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'No se pudo obtener una respuesta.');

      setMessages((current) => [...current, { role: 'model', text: data.message }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
      setMessages((current) => [
        ...current,
        { role: 'model', text: `⚠️ ${message}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <section
          aria-label="CiberShield IA"
          className="fixed bottom-24 right-4 z-[90] flex h-[min(620px,calc(100vh-120px))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-surface-dark"
        >
          <header className="flex items-center justify-between bg-primary-500 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-2">
                <ShieldCheck size={22} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-sm font-bold">CiberShield IA</h2>
                <p className="text-xs text-white/80">Asistente educativo de ciberseguridad</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chatbot"
              className="rounded-lg p-2 hover:bg-white/10"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto bg-surface-light p-3 dark:bg-surface-dark">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-primary-500 text-white'
                        : 'rounded-bl-md border border-slate-200 bg-white text-ink-900 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-slate-100'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && !loading && (
                <div className="space-y-2 pt-1">
                  <p className="px-1 text-xs font-medium text-slate-500 dark:text-slate-400">Puedes preguntarme:</p>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage(undefined, suggestion)}
                      className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs text-ink-700 transition hover:border-primary-300 hover:bg-primary-50 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-slate-200 dark:hover:border-primary-300"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-500 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-slate-300">
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    CiberShield IA está pensando…
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={sendMessage} className="border-t border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-surface-dark">
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 p-1.5 focus-within:border-primary-500 dark:border-slate-600 dark:bg-surface-dark-elevated">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1200}
                disabled={loading}
                placeholder="Escribe tu pregunta…"
                aria-label="Pregunta para CiberShield IA"
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-ink-900 outline-none placeholder:text-slate-400 dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Enviar pregunta"
                className="rounded-lg bg-seguro-500 p-2.5 text-white transition hover:bg-seguro-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={17} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-400">
              La IA puede cometer errores. Verifica información importante.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Cerrar CiberShield IA' : 'Abrir CiberShield IA'}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[91] flex h-14 w-14 items-center justify-center rounded-full bg-seguro-500 text-white shadow-lg transition hover:scale-105 hover:bg-seguro-600 focus:outline-none focus:ring-2 focus:ring-seguro-400 focus:ring-offset-2 dark:focus:ring-offset-surface-dark"
      >
        {open ? <ChevronDown size={24} aria-hidden="true" /> : <MessageCircle size={25} aria-hidden="true" />}
        {!open && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-alerta-500" aria-hidden="true" />}
      </button>
    </>
  );
}
