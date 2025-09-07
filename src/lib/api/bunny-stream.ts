import { Video } from '@/components/video/VideoGallery'

interface BunnyStreamConfig {
  libraryId: string
  apiKey: string
  pullZone?: string
  storageZone?: string
}

interface BunnyVideo {
  guid: string
  title: string
  description: string
  dateUploaded: string
  views: number
  length: number
  status: number
  framerate: number
  width: number
  height: number
  availableResolutions: string
  thumbnailCount: number
  encodeProgress: number
  storageSize: number
  captions: Array<{
    srclang: string
    label: string
  }>
  hasMP4Fallback: boolean
  collectionId: string
  thumbnailFileName: string
  averageWatchTime: number
  totalWatchTime: number
  category: string
  chapters: any[]
  moments: any[]
  metaTags: Array<{
    property: string
    value: string
  }>
  transcodingMessages: any[]
}

class BunnyStreamAPI {
  private config: BunnyStreamConfig

  constructor(config: BunnyStreamConfig) {
    this.config = config
  }

  private getHeaders(): Record<string, string> {
    return {
      'Accept': 'application/json',
      'AccessKey': this.config.apiKey,
      'Content-Type': 'application/json'
    }
  }

  private getThumbnailUrl(videoId: string, thumbnailFileName?: string): string {
    // For private videos, we can either:
    // 1. Use a placeholder image
    // 2. Generate a signed URL with token (requires additional setup)
    // 3. Use the iframe preview URL
    
    const pullZone = this.config.pullZone || '3e384f11-80b'
    
    // Try direct CDN URL first (works for public videos)
    if (!thumbnailFileName) {
      return `https://vz-${pullZone}.b-cdn.net/${videoId}/thumbnail.jpg`
    }
    return `https://vz-${pullZone}.b-cdn.net/${videoId}/${thumbnailFileName}`
  }

  async getVideo(videoId: string): Promise<Video | null> {
    try {
      const response = await fetch(
        `https://video.bunnycdn.com/library/${this.config.libraryId}/videos/${videoId}`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 60 }
        }
      )

      if (!response.ok) {
        return null
      }

      const video: BunnyVideo = await response.json()

      return {
        guid: video.guid,
        title: video.title,
        description: video.description || '',
        thumbnail: this.getThumbnailUrl(video.guid, video.thumbnailFileName),
        duration: video.length,
        dateUploaded: video.dateUploaded,
        views: video.views,
        category: video.category || 'News'
      }
    } catch (error) {
      console.error('Error fetching video from Bunny Stream:', error)
      return null
    }
  }

  async getVideos(
    page: number = 1,
    itemsPerPage: number = 12,
    orderBy: string = 'date',
    search?: string,
    collection?: string
  ): Promise<{ items: Video[], totalItems: number }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        itemsPerPage: itemsPerPage.toString(),
        orderBy: orderBy
      })

      if (search) {
        params.append('search', search)
      }

      if (collection) {
        params.append('collection', collection)
      }

      const response = await fetch(
        `https://video.bunnycdn.com/library/${this.config.libraryId}/videos?${params}`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 60 }
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.statusText}`)
      }

      const data = await response.json()

      const videos: Video[] = data.items.map((video: BunnyVideo) => ({
        guid: video.guid,
        title: video.title,
        description: video.description || '',
        thumbnail: this.getThumbnailUrl(video.guid, video.thumbnailFileName),
        duration: video.length,
        dateUploaded: video.dateUploaded,
        views: video.views,
        category: video.category || 'News'
      }))

      return {
        items: videos,
        totalItems: data.totalItems || videos.length
      }
    } catch (error) {
      console.error('Error fetching videos from Bunny Stream:', error)
      return { items: [], totalItems: 0 }
    }
  }

  async getCollections(): Promise<Array<{ guid: string, name: string, videoCount: number }>> {
    try {
      const response = await fetch(
        `https://video.bunnycdn.com/library/${this.config.libraryId}/collections`,
        {
          headers: this.getHeaders(),
          next: { revalidate: 3600 }
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch collections: ${response.statusText}`)
      }

      const data = await response.json()
      return data.items || []
    } catch (error) {
      console.error('Error fetching collections from Bunny Stream:', error)
      return []
    }
  }

  async updateVideoViews(videoId: string): Promise<void> {
    try {
      await fetch(
        `https://video.bunnycdn.com/library/${this.config.libraryId}/videos/${videoId}/views`,
        {
          method: 'POST',
          headers: this.getHeaders()
        }
      )
    } catch (error) {
      console.error('Error updating video views:', error)
    }
  }

  getVideoEmbedUrl(videoId: string): string {
    const libraryId = this.config.libraryId || '491503'
    return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`
  }

  getVideoDirectUrl(videoId: string): string {
    const pullZone = this.config.pullZone || '3e384f11-80b'
    return `https://vz-${pullZone}.b-cdn.net/${videoId}/playlist.m3u8`
  }
}

const bunnyStreamConfig: BunnyStreamConfig = {
  libraryId: process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID || '',
  apiKey: process.env.BUNNY_STREAM_API_KEY || '',
  pullZone: process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE || '',
  storageZone: process.env.BUNNY_STORAGE_ZONE || ''
}

export const bunnyStream = new BunnyStreamAPI(bunnyStreamConfig)