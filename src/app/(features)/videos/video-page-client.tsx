'use client'

import React, { useState, useEffect, useCallback } from 'react'
import VideoGallery, { Video } from '@/components/video/VideoGallery'

interface VideoPageClientProps {
  initialVideos: Video[]
  totalItems: number
}

export default function VideoPageClient({ 
  initialVideos, 
  totalItems 
}: VideoPageClientProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(totalItems > 12)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { value: 'all', label: 'All Videos' },
    { value: 'breaking', label: 'Breaking News' },
    { value: 'politics', label: 'Politics' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'world', label: 'World News' },
    { value: 'africa', label: 'Africa' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'technology', label: 'Technology' }
  ]

  const loadMoreVideos = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        limit: '12'
      })

      if (searchQuery) {
        params.append('search', searchQuery)
      }

      if (selectedCategory !== 'all') {
        params.append('collection', selectedCategory)
      }

      const response = await fetch(`/api/videos?${params}`)
      const data = await response.json()

      if (data.videos && data.videos.length > 0) {
        setVideos(prev => [...prev, ...data.videos])
        setPage(prev => prev + 1)
        setHasMore(page + 1 < data.totalPages)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error loading more videos:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page, searchQuery, selectedCategory])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setPage(1)

    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '12',
        search: searchQuery
      })

      if (selectedCategory !== 'all') {
        params.append('collection', selectedCategory)
      }

      const response = await fetch(`/api/videos?${params}`)
      const data = await response.json()

      setVideos(data.videos || [])
      setHasMore(data.totalPages > 1)
    } catch (error) {
      console.error('Error searching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category)
    setLoading(true)
    setPage(1)

    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '12'
      })

      if (category !== 'all') {
        params.append('collection', category)
      }

      if (searchQuery) {
        params.append('search', searchQuery)
      }

      const response = await fetch(`/api/videos?${params}`)
      const data = await response.json()

      setVideos(data.videos || [])
      setHasMore(data.totalPages > 1)
    } catch (error) {
      console.error('Error filtering videos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
        loadMoreVideos()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, hasMore, loading, loadMoreVideos])

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl">
            <div className="flex-1">
              <input
                type="search"
                placeholder="Search video news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      {videos.length > 0 && (
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <p className="text-gray-600">
            Showing {videos.length} videos
            {searchQuery && (
              <span> for "<span className="text-gray-900 font-medium">{searchQuery}</span>"</span>
            )}
            {selectedCategory !== 'all' && (
              <span> in <span className="text-red-600 font-medium">{categories.find(c => c.value === selectedCategory)?.label}</span></span>
            )}
          </p>
        </div>
      )}

      {/* Video Grid */}
      <VideoGallery
        videos={videos}
        columns={3}
        showDescription={true}
        className=""
      />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
            <span>Loading more videos...</span>
          </div>
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && videos.length > 0 && (
        <div className="text-center py-8">
          <button
            onClick={loadMoreVideos}
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Load More Videos
          </button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && videos.length > 0 && (
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-500">You've reached the end of our video collection</p>
        </div>
      )}

      {/* No Results */}
      {videos.length === 0 && !loading && (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your search or filter criteria to find more videos.'
              : 'No video content is currently available. Please check back later.'}
          </p>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                handleCategoryChange('all')
              }}
              className="mt-4 text-red-600 hover:text-red-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}