import { NextResponse } from 'next/server'
import { bunnyStream } from '@/lib/api/bunny-stream'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    // Fetch all videos (you might want to paginate for large collections)
    const { items: videos } = await bunnyStream.getVideos(1, 100, 'date')
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reportfocusnews.com'
    
    // Generate video sitemap XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos.map(video => {
  const videoUrl = `${baseUrl}/videos/${video.guid}`
  const duration = video.duration || 0
  
  return `  <url>
    <loc>${videoUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${video.thumbnail || `${baseUrl}/video-placeholder.jpg`}</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${video.description || video.title}]]></video:description>
      <video:player_loc>${baseUrl}/videos/player/${video.guid}</video:player_loc>
      <video:duration>${duration}</video:duration>
      <video:view_count>${video.views || 0}</video:view_count>
      <video:publication_date>${video.dateUploaded ? new Date(video.dateUploaded).toISOString() : new Date().toISOString()}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:tag>news</video:tag>
      ${video.category ? `<video:tag>${video.category}</video:tag>` : ''}
      <video:category>News</video:category>
      <video:uploader info="${baseUrl}">Report Focus News</video:uploader>
      <video:live>no</video:live>
    </video:video>
  </url>`
}).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating video sitemap:', error)
    return new NextResponse('Error generating video sitemap', { status: 500 })
  }
}