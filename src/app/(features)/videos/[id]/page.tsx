import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { bunnyStream } from '@/lib/api/bunny-stream'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import BunnyVideoPlayer from '@/components/video/BunnyVideoPlayer'
import VideoSchema, { secondsToISO8601Duration } from '@/components/seo/VideoSchema'
import Link from 'next/link'

interface Props {
  params: { id: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const video = await bunnyStream.getVideo(params.id)
    
    if (!video) {
      return {
        title: 'Video Not Found',
        description: 'The requested video could not be found.'
      }
    }

    return {
      title: `${video.title} | Report Focus News Video`,
      description: video.description || `Watch ${video.title} on Report Focus News`,
      openGraph: {
        title: video.title,
        description: video.description || `Watch ${video.title}`,
        type: 'video.other',
        videos: [{
          url: `https://reportfocusnews.com/videos/${video.guid}`,
          width: 1280,
          height: 720,
        }],
        images: video.thumbnail ? [{ url: video.thumbnail }] : undefined,
      },
      twitter: {
        card: 'player',
        title: video.title,
        description: video.description || `Watch ${video.title}`,
        images: video.thumbnail ? [video.thumbnail] : undefined,
        players: [{
          playerUrl: `https://reportfocusnews.com/videos/player/${video.guid}`,
          streamUrl: `https://reportfocusnews.com/videos/stream/${video.guid}`,
          width: 1280,
          height: 720,
        }]
      }
    }
  } catch (error) {
    return {
      title: 'Video | Report Focus News',
      description: 'Watch news videos on Report Focus News'
    }
  }
}

export default async function VideoPage({ params }: Props) {
  let video
  
  try {
    video = await bunnyStream.getVideo(params.id)
    if (!video) notFound()
  } catch (error) {
    notFound()
  }

  // Get related videos
  const { items: relatedVideos } = await bunnyStream.getVideos(1, 6, 'date')
    .catch(() => ({ items: [] }))

  return (
    <>
      <HeaderWrapper />
      
      {/* Video Schema for SEO */}
      <VideoSchema
        title={video.title}
        description={video.description || video.title}
        thumbnailUrl={video.thumbnail || ''}
        uploadDate={video.dateUploaded || new Date().toISOString()}
        duration={secondsToISO8601Duration(video.duration || 0)}
        embedUrl={`https://reportfocusnews.com/videos/player/${video.guid}`}
        views={video.views}
      />
      
      <main className="bg-white">
        <div className="container-wide py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/videos/all" className="hover:text-red-600">Videos</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{video.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video */}
            <div className="lg:col-span-2">
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                <BunnyVideoPlayer
                  videoId={video.guid}
                  title={video.title}
                  thumbnail={video.thumbnail}
                />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {video.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span>{video.views || 0} views</span>
                <span>•</span>
                <time dateTime={video.dateUploaded}>
                  {new Date(video.dateUploaded || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              {video.description && (
                <div className="prose prose-lg max-w-none">
                  <p>{video.description}</p>
                </div>
              )}
              
              {/* Share buttons */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-4">Share this video</h3>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://reportfocusnews.com/videos/${video.guid}`)}&text=${encodeURIComponent(video.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://reportfocusnews.com/videos/${video.guid}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${video.title} https://reportfocusnews.com/videos/${video.guid}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
            
            {/* Sidebar - Related Videos */}
            <aside>
              <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
              <div className="space-y-4">
                {relatedVideos.filter(v => v.guid !== video.guid).slice(0, 5).map((relatedVideo) => (
                  <Link
                    key={relatedVideo.guid}
                    href={`/videos/${relatedVideo.guid}`}
                    className="flex gap-3 group"
                  >
                    <div className="w-40 aspect-video bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      {relatedVideo.thumbnail && (
                        <img
                          src={relatedVideo.thumbnail}
                          alt={relatedVideo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-red-600">
                        {relatedVideo.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {relatedVideo.views || 0} views
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}