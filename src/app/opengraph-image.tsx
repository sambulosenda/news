import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Report Focus News - Southern Africa\'s Trusted News Source'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            letterSpacing: '-0.025em',
            marginBottom: 20,
          }}
        >
          REPORT FOCUS
        </div>
        <div
          style={{
            fontSize: 36,
            opacity: 0.9,
            marginBottom: 40,
          }}
        >
          NEWS
        </div>
        <div
          style={{
            fontSize: 24,
            opacity: 0.8,
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Breaking News • South Africa & Zimbabwe
        </div>
        <div
          style={{
            fontSize: 20,
            opacity: 0.7,
            marginTop: 20,
          }}
        >
          Politics • Business • Load Shedding • Crime • Sports
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}