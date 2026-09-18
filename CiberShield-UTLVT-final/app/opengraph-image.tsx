import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/constants';

export const runtime = 'edge';
export const alt = 'CiberShield UTLVT — Plataforma educativa de ciberseguridad';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A1220',
          backgroundImage:
            'radial-gradient(circle at 25% 15%, rgba(18,58,102,0.55), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#123A66',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="34" height="34" viewBox="0 0 30 30" fill="none">
              <path
                d="M10 14.6L13.2 17.8L20 10.4"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span style={{ fontSize: 40, fontWeight: 700, color: 'white' }}>{SITE_NAME}</span>
        </div>
        <p
          style={{
            marginTop: 28,
            fontSize: 26,
            color: '#94A3B8',
            maxWidth: 760,
            textAlign: 'center',
          }}
        >
          Concientización en ciberseguridad para estudiantes universitarios
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 32,
            padding: '8px 18px',
            borderRadius: 999,
            background: 'rgba(31,168,92,0.12)',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: 999, background: '#157A40' }} />
          <span style={{ fontSize: 18, color: '#4ADE8A' }}>Plataforma activa</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
