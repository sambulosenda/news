'use client'

import { useState } from 'react'

interface BunnyVideoPlayerProps {
  videoId: string
  title?: string
  thumbnail?: string
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
  loop?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  className?: string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

export default function BunnyVideoPlayer({
  videoId,
  title: _title,
  thumbnail,
  autoplay = false,
  muted = false,
  controls = true,
  loop = false,
  preload = 'metadata',
  className = '',
  onPlay,
  onPause,
  onEnded,
}: BunnyVideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  // Use direct CDN URLs that work without authentication
  const pullZone = '3e384f11-80b'
  const hlsUrl = `https://vz-${pullZone}.b-cdn.net/${videoId}/playlist.m3u8`
  const mp4UrlOriginal = `https://vz-${pullZone}.b-cdn.net/${videoId}/original`  // Original file
  const mp4Url720 = `https://vz-${pullZone}.b-cdn.net/${videoId}/play_720p.mp4`
  const mp4Url480 = `https://vz-${pullZone}.b-cdn.net/${videoId}/play_480p.mp4`
  const mp4Url360 = `https://vz-${pullZone}.b-cdn.net/${videoId}/play_360p.mp4`
  const posterUrl = thumbnail || `https://vz-${pullZone}.b-cdn.net/${videoId}/thumbnail.jpg`
  
  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10 pointer-events-none">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center text-white p-4">
            <p className="mb-2">Unable to load video</p>
            <button 
              onClick={() => {
                setHasError(false)
                setIsLoading(true)
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <video
          controls={controls}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          preload={preload}
          poster={posterUrl}
          className="w-full h-full object-contain"
          onLoadedData={() => setIsLoading(false)}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onError={(_e) => {
            console.warn(`Trying fallback sources for video: ${videoId}`)
            // Don't immediately show error, let browser try other sources
            setIsLoading(false)
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
    </div>
  )
}