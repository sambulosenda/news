'use client'

import { useState } from 'react'

interface BunnyVideoPlayerSimpleProps {
  videoId: string
  title?: string
  className?: string
}

export default function BunnyVideoPlayerSimple({
  videoId,
  title,
  className = '',
}: BunnyVideoPlayerSimpleProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, _setHasError] = useState(false)
  
  // Direct URLs with multiple fallbacks
  const pullZone = '3e384f11-80b'
  const hlsUrl = `https://vz-${pullZone}.b-cdn.net/${videoId}/playlist.m3u8`
  const mp4UrlOriginal = `https://vz-${pullZone}.b-cdn.net/${videoId}/original`
  const mp4Url720 = `https://vz-${pullZone}.b-cdn.net/${videoId}/play_720p.mp4`
  const mp4Url480 = `https://vz-${pullZone}.b-cdn.net/${videoId}/play_480p.mp4`
  const mp4Url360 = `https://vz-${pullZone}.b-cdn.net/${videoId}/play_360p.mp4`
  const posterUrl = `https://vz-${pullZone}.b-cdn.net/${videoId}/thumbnail.jpg`
  
  return (
    <div className={`relative bg-black rounded-lg overflow-hidden group ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10 pointer-events-none">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
      
      {hasError ? (
        <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-900">
          <p className="text-white text-center">Unable to load video</p>
        </div>
      ) : (
        <video
          controls
          className="w-full aspect-video"
          poster={posterUrl}
          onLoadedData={() => setIsLoading(false)}
          onError={(_e) => {
            // Don't immediately error, let browser try other sources
            console.warn(`Trying fallback sources for video: ${videoId}`)
            setIsLoading(false)
            // Only show error if all sources fail (handled by browser)
          }}
        >
          <source src={mp4UrlOriginal} type="video/mp4" />
          <source src={mp4Url720} type="video/mp4" />
          <source src={mp4Url480} type="video/mp4" />
          <source src={mp4Url360} type="video/mp4" />
          <source src={hlsUrl} type="application/x-mpegURL" />
          Your browser does not support the video tag.
        </video>
      )}

      {title && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
      )}
    </div>
  )
}