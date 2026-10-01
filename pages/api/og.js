import { ImageResponse } from 'next/og'

export const config = {
  runtime: 'edge',
}

const fontUrl = 'https://cdn.jsdelivr.net/fontsource/fonts/geist@5.2.5/latin-600-normal.woff'

export default async function handler(req) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'Jeevan Wijerathna').slice(0, 140)

  let fonts
  try {
    const font = await fetch(fontUrl).then((res) => res.arrayBuffer())
    fonts = [{ name: 'Geist', data: font, weight: 600, style: 'normal' }]
  } catch (error) {
    fonts = undefined
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#FFFFFF',
          color: '#111827',
          padding: '80px',
          fontFamily: 'Geist',
          fontSize: 68,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1.04,
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  )
}
