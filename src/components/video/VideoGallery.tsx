'use client'

import { useState, useEffect } from 'react'
import ProfessionalVideoModal from './ProfessionalVideoModal'

export interface Video {
  guid: string
  title: string
  description?: string
  thumbnail?: string
  duration?: number
  dateUploaded?: string
  views?: number
  category?: string
}

interface VideoGalleryProps {
  videos: Video[]
  title?: string
  columns?: 1 | 2 | 3 | 4
  showDescription?: boolean
  className?: string
}

function formatDuration(seconds?: number): string {
  if (!seconds) return '0:00'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

function formatViews(views?: number): string {
  if (!views) return '0 views'
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`
  }
  return `${views} views`
}

export default function VideoGallery({
  videos,
  title,
  columns = 3,
  showDescription = true,
  className = ''
}: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedVideo(null), 300)
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      )}

      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
        {videos.map((video) => (
          <article
            key={video.guid}
            className="group cursor-pointer"
            onClick={() => openVideoModal(video)}
          >
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Hide broken image and show placeholder
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
              ) : null}
              <div className={`w-full h-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center ${video.thumbnail ? 'hidden' : ''}`}>
                <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-3">
                  <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
              {video.title}
            </h3>

            {showDescription && video.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {video.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{formatViews(video.views)}</span>
              {video.dateUploaded && (
                <>
                  <span>•</span>
                  <time dateTime={video.dateUploaded}>
                    {new Date(video.dateUploaded).toLocaleDateString()}
                  </time>
                </>
              )}
              {video.category && (
                <>
                  <span>•</span>
                  <span className="text-red-600">{video.category}</span>
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      {selectedVideo && (
        <ProfessionalVideoModal
          video={selectedVideo}
          isOpen={isModalOpen}
          onClose={closeModal}
          relatedVideos={videos.filter(v => v.guid !== selectedVideo.guid)}
          onVideoSelect={(video) => {
            setSelectedVideo(video)
          }}
        />
      )}
    </div>
  )
}