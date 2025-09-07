'use client'

import BunnyVideoPlayer from '@/components/video/BunnyVideoPlayer'
import BunnyVideoPlayerSimple from '@/components/video/BunnyVideoPlayerSimple'
import BunnyVideoPlayerAuth from '@/components/video/BunnyVideoPlayerAuth'

export default function TestVideoPage() {
  // Using the actual video GUID from your Bunny Stream account
  const testVideoId = 'ca956a44-5d85-46e8-ae54-c455a7e6ad74'
  const libraryId = '491503'
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Test Video Player</h1>
      
      <div className="max-w-4xl mx-auto">
        <p className="mb-4">Testing with Video ID: {testVideoId}</p>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Simple Player (Direct URLs):</h2>
          <BunnyVideoPlayerSimple
            videoId={testVideoId}
            title="White VW Polo broken in two pieces on N2 highway"
          />
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Original Player (Iframe):</h2>
          <BunnyVideoPlayer
            videoId={testVideoId}
            title="White VW Polo broken in two pieces on N2 highway"
          />
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Authenticated Player (With Error Handling):</h2>
          <BunnyVideoPlayerAuth
            videoId={testVideoId}
            title="White VW Polo broken in two pieces on N2 highway"
          />
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Debug Info:</h2>
          <p>Library ID: {libraryId}</p>
          <p>Pull Zone: 3e384f11-80b</p>
          <p>Embed URL: https://iframe.mediadelivery.net/embed/{libraryId}/{testVideoId}</p>
        </div>
        
        <div className="mt-8">
          <h2 className="font-bold mb-2">Direct Embed Test:</h2>
          <iframe
            src={`https://iframe.mediadelivery.net/embed/${libraryId}/${testVideoId}?autoplay=false&preload=true`}
            loading="eager"
            className="w-full aspect-video border-2 border-gray-300"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            title="Test Video"
          />
        </div>
        
        <div className="mt-8">
          <h2 className="font-bold mb-2">Thumbnail Test:</h2>
          <img 
            src={`https://vz-3e384f11-80b.b-cdn.net/${testVideoId}/thumbnail.jpg`}
            alt="Video thumbnail"
            className="w-full"
            onError={(e) => console.error('Thumbnail failed to load', e)}
            onLoad={() => console.log('Thumbnail loaded successfully')}
          />
        </div>
      </div>
    </div>
  )
}