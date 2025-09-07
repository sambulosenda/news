'use client'

import { useState } from 'react'
import BunnyVideoPlayer from './BunnyVideoPlayer'

interface ArticleVideoEmbedProps {
  videoId: string
  title?: string
  caption?: string
  aspectRatio?: '16:9' | '4:3' | '1:1'
  autoplay?: boolean
  className?: string
}

export default function ArticleVideoEmbed({
  videoId,
  title,
  caption,
  aspectRatio = '16:9',
  autoplay = false,
  className = ''
}: ArticleVideoEmbedProps) {
  const [_hasPlayed, setHasPlayed] = useState(false)

  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square'
  }

  return (
    <figure className={`my-8 ${className}`}>
      <div className={`relative ${aspectRatioClasses[aspectRatio]} bg-gray-100 rounded-lg overflow-hidden`}>
        <BunnyVideoPlayer
          videoId={videoId}
          title={title}
          autoplay={autoplay}
          muted={autoplay}
          onPlay={() => setHasPlayed(true)}
          className="w-full h-full"
        />
      </div>
      
      {(title || caption) && (
        <figcaption className="mt-3 text-sm text-gray-600">
          {title && <strong className="font-semibold">{title}</strong>}
          {title && caption && ' — '}
          {caption}
        </figcaption>
      )}
    </figure>
  )
}