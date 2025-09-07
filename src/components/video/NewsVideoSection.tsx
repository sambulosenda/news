'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import CDNImage from '@/components/common/CDNImage'
import BunnyVideoPlayer from './BunnyVideoPlayer'
import { formatDistanceToNow } from 'date-fns'

export interface NewsVideo {
  guid: string
  title: string
  description?: string
  thumbnail?: string
  duration: number
  dateUploaded: string
  views: number
  category?: string
  tags?: string[]
}

interface NewsVideoSectionProps {
  videos: NewsVideo[]
  title?: string
  variant?: 'featured' | 'trending' | 'category'
  showViewAll?: boolean
  className?: string
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return `${views}`
}

export default function NewsVideoSection({
  videos,
  title = "Video News",
  variant = 'featured',
  showViewAll = true,
  className = ''
}: NewsVideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<NewsVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openVideoModal = (video: NewsVideo) => {
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

  if (!videos || videos.length === 0) {
    return null
  }

  const renderFeaturedLayout = () => {
    const featuredVideo = videos[0]
    const sideVideos = videos.slice(1, 4)

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Video */}
        <div className="lg:col-span-1">
          <article
            className="group cursor-pointer"
            onClick={() => openVideoModal(featuredVideo)}
          >
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              {featuredVideo.thumbnail ? (
                <CDNImage
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  width={640}
                  height={360}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-4 shadow-lg">
                  <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-2 py-1 rounded font-medium">
                {formatDuration(featuredVideo.duration)}
              </div>

              {/* Category badge */}
              {featuredVideo.category && (
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold uppercase tracking-wide">
                  {featuredVideo.category}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
                {featuredVideo.title}
              </h3>
              
              {featuredVideo.description && (
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {featuredVideo.description}
                </p>
              )}
              
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {formatViews(featuredVideo.views)}
                </span>
                <span>•</span>
                <time dateTime={featuredVideo.dateUploaded}>
                  {formatDistanceToNow(new Date(featuredVideo.dateUploaded), { addSuffix: true })}
                </time>
              </div>
            </div>
          </article>
        </div>

        {/* Side Videos */}
        <div className="space-y-4">
          {sideVideos.map((video) => (
            <article
              key={video.guid}
              className="group cursor-pointer flex gap-4"
              onClick={() => openVideoModal(video)}
            >
              <div className="relative w-32 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                {video.thumbnail ? (
                  <CDNImage
                    src={video.thumbnail}
                    alt={video.title}
                    width={128}
                    height={80}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-1">
                  {video.title}
                </h4>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatViews(video.views)}</span>
                  <span>•</span>
                  <time dateTime={video.dateUploaded}>
                    {formatDistanceToNow(new Date(video.dateUploaded), { addSuffix: true })}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    )
  }

  const renderTrendingLayout = () => {
    return (
      <div className="space-y-4">
        {videos.slice(0, 5).map((video, index) => (
          <article
            key={video.guid}
            className="group cursor-pointer flex gap-4 pb-4 border-b border-gray-200 last:border-0"
            onClick={() => openVideoModal(video)}
          >
            <div className="relative w-36 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
              {video.thumbnail ? (
                <CDNImage
                  src={video.thumbnail}
                  alt={video.title}
                  width={144}
                  height={96}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                {formatDuration(video.duration)}
              </div>
              
              {/* Trending number */}
              <div className="absolute top-1 left-1 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-1">
                  {video.title}
                </h4>
                
                {video.category && (
                  <span className="inline-block text-xs text-red-600 font-medium uppercase tracking-wide">
                    {video.category}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {formatViews(video.views)}
                </span>
                <span>•</span>
                <time dateTime={video.dateUploaded}>
                  {formatDistanceToNow(new Date(video.dateUploaded), { addSuffix: true })}
                </time>
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  }

  const renderCategoryLayout = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, 6).map((video) => (
          <article
            key={video.guid}
            className="group cursor-pointer"
            onClick={() => openVideoModal(video)}
          >
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
              {video.thumbnail ? (
                <CDNImage
                  src={video.thumbnail}
                  alt={video.title}
                  width={320}
                  height={180}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-3">
                  <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                {video.title}
              </h4>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{formatViews(video.views)}</span>
                <span>•</span>
                <time dateTime={video.dateUploaded}>
                  {formatDistanceToNow(new Date(video.dateUploaded), { addSuffix: true })}
                </time>
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <section className={`bg-white ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 pb-2 border-b-2 border-red-600">
          {title}
        </h2>
        {showViewAll && (
          <Link
            href="/videos/all"
            className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
      </div>

      {variant === 'featured' && renderFeaturedLayout()}
      {variant === 'trending' && renderTrendingLayout()}
      {variant === 'category' && renderCategoryLayout()}

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close video"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <BunnyVideoPlayer
              videoId={selectedVideo.guid}
              title={selectedVideo.title}
              autoplay={true}
              className="w-full"
            />

            <div className="mt-6 text-white">
              <h2 className="text-2xl font-bold mb-3">{selectedVideo.title}</h2>
              {selectedVideo.description && (
                <p className="text-gray-300 mb-4 leading-relaxed">{selectedVideo.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {formatViews(selectedVideo.views)} views
                </span>
                <span>•</span>
                <time dateTime={selectedVideo.dateUploaded}>
                  {formatDistanceToNow(new Date(selectedVideo.dateUploaded), { addSuffix: true })}
                </time>
                {selectedVideo.category && (
                  <>
                    <span>•</span>
                    <span className="text-red-400">{selectedVideo.category}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}