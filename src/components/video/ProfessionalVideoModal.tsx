'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Share2, Download, ChevronLeft, ChevronRight, Eye, Calendar, ThumbsUp, MessageCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

import { Video } from './VideoGallery'

interface ProfessionalVideoModalProps {
  video: Video
  isOpen: boolean
  onClose: () => void
  relatedVideos?: Video[]
  onVideoSelect?: (video: Video) => void
}

export default function ProfessionalVideoModal({
  video,
  isOpen,
  onClose,
  relatedVideos = [],
  onVideoSelect
}: ProfessionalVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false)
      setShowShareMenu(false)
      setProgress(0)
      setCurrentTime(0)
    } else {
      // Don't auto-play, let user click to play
      setIsPlaying(false)
      setIsMuted(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch(e.key) {
        case 'Escape':
          if (isFullscreen) {
            toggleFullscreen()
          } else {
            onClose()
          }
          break
        case ' ':
          e.preventDefault()
          togglePlayPause()
          break
        case 'ArrowRight':
          skipForward()
          break
        case 'ArrowLeft':
          skipBackward()
          break
        case 'ArrowUp':
          e.preventDefault()
          adjustVolume(0.1)
          break
        case 'ArrowDown':
          e.preventDefault()
          adjustVolume(-0.1)
          break
        case 'm':
          toggleMute()
          break
        case 'f':
          toggleFullscreen()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isFullscreen])

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  const togglePlayPause = () => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!modalRef.current) return
    
    if (!isFullscreen) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const skipForward = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
  }

  const skipBackward = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
  }

  const adjustVolume = (delta: number) => {
    if (!videoRef.current) return
    const newVolume = Math.max(0, Math.min(1, volume + delta))
    videoRef.current.volume = newVolume
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
      videoRef.current.muted = false
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value)
    setProgress(newProgress)
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * duration
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      if (newVolume === 0) {
        setIsMuted(true)
        videoRef.current.muted = true
      } else {
        setIsMuted(false)
        videoRef.current.muted = false
      }
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const shareVideo = (platform: string) => {
    const url = window.location.href
    const text = `Check out: ${video.title}`
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`)
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        break
    }
    setShowShareMenu(false)
  }

  if (!isOpen || !video) return null

  // Video URLs - matching the working format
  const pullZone = '3e384f11-80b'
  const hlsUrl = `https://vz-${pullZone}.b-cdn.net/${video.guid}/playlist.m3u8`
  const mp4UrlOriginal = `https://vz-${pullZone}.b-cdn.net/${video.guid}/original`
  const mp4Url720 = `https://vz-${pullZone}.b-cdn.net/${video.guid}/play_720p.mp4`
  const mp4Url480 = `https://vz-${pullZone}.b-cdn.net/${video.guid}/play_480p.mp4`
  const mp4Url360 = `https://vz-${pullZone}.b-cdn.net/${video.guid}/play_360p.mp4`
  const posterUrl = video.thumbnail || `https://vz-${pullZone}.b-cdn.net/${video.guid}/thumbnail.jpg`

  return (
    <div className="fixed inset-0 z-[9999] bg-black animate-fadeIn">
      <div 
        ref={modalRef}
        className="relative w-full h-full flex flex-col lg:flex-row"
        onMouseMove={handleMouseMove}
      >
        {/* Main Video Section */}
        <div className="flex-1 relative bg-black flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Container */}
          <div className="relative w-full h-full max-w-[1400px] mx-auto">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
                  <p className="text-white text-lg">Loading video...</p>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              poster={posterUrl}
              className="w-full h-full object-contain"
              onLoadedMetadata={(e) => {
                const video = e.currentTarget
                setDuration(video.duration)
                setIsLoading(false)
              }}
              onTimeUpdate={(e) => {
                const video = e.currentTarget
                setCurrentTime(video.currentTime)
                setProgress((video.currentTime / video.duration) * 100)
              }}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlayPause}
              onError={(_e) => {
                // Don't show error immediately, let browser try other sources
                console.warn(`Trying fallback sources for video: ${video.guid}`)
                setIsLoading(false)
              }}
            >
              <source src={mp4UrlOriginal} type="video/mp4" />
              <source src={mp4Url720} type="video/mp4" />
              <source src={mp4Url480} type="video/mp4" />
              <source src={mp4Url360} type="video/mp4" />
              <source src={hlsUrl} type="application/x-mpegURL" />
            </video>

            {/* Center Play/Pause Overlay */}
            {!isPlaying && !isLoading && (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={togglePlayPause}
              >
                <div className="p-6 rounded-full bg-red-600/90 hover:bg-red-600 transition-all transform hover:scale-110">
                  <Play className="w-16 h-16 text-white" fill="white" />
                </div>
              </div>
            )}

            {/* Video Controls */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${progress}%, #4b5563 ${progress}%, #4b5563 100%)`
                  }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" fill="white" />
                    )}
                  </button>

                  {/* Skip Backward */}
                  <button
                    onClick={skipBackward}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>

                  {/* Skip Forward */}
                  <button
                    onClick={skipForward}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>

                  {/* Volume */}
                  <div className="relative flex items-center">
                    <button
                      onClick={toggleMute}
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      className="p-2 hover:bg-white/20 rounded-full transition"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                    
                    {showVolumeSlider && (
                      <div 
                        className="absolute left-12 bg-black/80 p-2 rounded-lg"
                        onMouseLeave={() => setShowVolumeSlider(false)}
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${volume * 100}%, #4b5563 ${volume * 100}%, #4b5563 100%)`
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Share */}
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="p-2 hover:bg-white/20 rounded-full transition"
                    >
                      <Share2 className="w-5 h-5 text-white" />
                    </button>
                    
                    {showShareMenu && (
                      <div className="absolute bottom-12 right-0 bg-gray-900 rounded-lg p-2 min-w-[150px]">
                        <button
                          onClick={() => shareVideo('twitter')}
                          className="w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded transition"
                        >
                          Twitter
                        </button>
                        <button
                          onClick={() => shareVideo('facebook')}
                          className="w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded transition"
                        >
                          Facebook
                        </button>
                        <button
                          onClick={() => shareVideo('whatsapp')}
                          className="w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded transition"
                        >
                          WhatsApp
                        </button>
                        <button
                          onClick={() => shareVideo('copy')}
                          className="w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded transition"
                        >
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Video Info & Related Videos */}
        <div className="w-full lg:w-96 bg-gray-950 border-l border-gray-800 overflow-y-auto">
          <div className="p-6">
            {/* Video Title & Stats */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-3">{video.title}</h2>
              
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {video.views?.toLocaleString() || '0'} views
                </span>
                {video.dateUploaded && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDistanceToNow(new Date(video.dateUploaded), { addSuffix: true })}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    isLiked ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" fill={isLiked ? 'white' : 'none'} />
                  Like
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition">
                  <MessageCircle className="w-4 h-4" />
                  Comment
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            {/* Description */}
            {video.description && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{video.description}</p>
              </div>
            )}

            {/* Related Videos */}
            {relatedVideos.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-4">Related Videos</h3>
                <div className="space-y-3">
                  {relatedVideos.slice(0, 5).map((relatedVideo) => (
                    <div
                      key={relatedVideo.guid}
                      onClick={() => onVideoSelect?.(relatedVideo)}
                      className="flex gap-3 cursor-pointer group"
                    >
                      <div className="relative w-32 h-20 flex-shrink-0">
                        <img
                          src={relatedVideo.thumbnail}
                          alt={relatedVideo.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {relatedVideo.duration && (
                          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                            {formatTime(relatedVideo.duration)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-red-500 transition">
                          {relatedVideo.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                          <span>{relatedVideo.views?.toLocaleString() || '0'} views</span>
                          {relatedVideo.dateUploaded && (
                            <span>• {formatDistanceToNow(new Date(relatedVideo.dateUploaded), { addSuffix: true })}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}