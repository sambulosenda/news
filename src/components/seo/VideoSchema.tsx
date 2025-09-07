import Script from 'next/script'

interface VideoSchemaProps {
  title: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string // ISO 8601 format (e.g., "PT1M30S" for 1 minute 30 seconds)
  contentUrl?: string
  embedUrl?: string
  views?: number
}

export default function VideoSchema({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  views
}: VideoSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "publisher": {
      "@type": "Organization",
      "name": "Report Focus News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reportfocusnews.com/logo.png"
      }
    },
    ...(contentUrl && { "contentUrl": contentUrl }),
    ...(embedUrl && { "embedUrl": embedUrl }),
    ...(views && { "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": views
    }})
  }

  return (
    <Script
      id="video-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Helper function to convert seconds to ISO 8601 duration
export function secondsToISO8601Duration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  let duration = 'PT'
  if (hours > 0) duration += `${hours}H`
  if (minutes > 0) duration += `${minutes}M`
  if (secs > 0) duration += `${secs}S`
  
  return duration || 'PT0S'
}