import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#123A66',
        }}
      >
        <svg width="118" height="118" viewBox="0 0 30 30" fill="none">
          <path
            d="M15 2L26 6.4V14C26 21 20.9 26.6 15 28C9.1 26.6 4 21 4 14V6.4L15 2Z"
            fill="#7DA0CE"
          />
          <path
            d="M10 14.6L13.2 17.8L20 10.4"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { width: 192, height: 192 }
  );
}
