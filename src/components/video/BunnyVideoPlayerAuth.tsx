'use client'

import { useState } from 'react'

interface BunnyVideoPlayerAuthProps {
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

export default function BunnyVideoPlayerAuth({
  videoId,
  title,
  className = '',
}: BunnyVideoPlayerAuthProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID || '491503'
  // const pullZone = process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE || '3e384f11-80b'
  
  // For public videos, use the iframe embed which handles authentication automatically
  // If videos are private, you'll need to implement token-based authentication
  const embedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&preload=true`
  
  // Alternative: Direct HLS stream URL (may require authentication token)
  // const streamUrl = `https://vz-${pullZone}.b-cdn.net/${videoId}/playlist.m3u8`
  // const thumbnailUrl = `https://vz-${pullZone}.b-cdn.net/${videoId}/thumbnail.jpg`
  
  return (
    <div className={`relative w-full aspect-video bg-black rounded-lg overflow-hidden ${className}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-white text-sm">Loading video...</p>
          </div>
        </div>
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center text-white p-4">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Video Access Error</h3>
            <p className="text-sm text-gray-300 mb-4">
              This video may be private or restricted. Please check:
            </p>
            <ul className="text-left text-sm text-gray-400 max-w-md mx-auto">
              <li>• The video is set to public in Bunny Stream</li>
              <li>• Your domain is whitelisted in Bunny Stream settings</li>
              <li>• The video ID is correct: {videoId}</li>
            </ul>
            <button 
              onClick={() => {
                setHasError(false)
                setIsLoading(true)
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          loading="lazy"
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          title={title || 'Video player'}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}