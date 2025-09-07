'use client'

export default function TestVideoSimplePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Video Test - Simple HTML5</h1>
      
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Test with a known working public video */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Test 1: Public Sample Video</h2>
          <video 
            controls 
            className="w-full rounded-lg"
            poster="https://sample-videos.com/img/Sample-jpg-image-50kb.jpg"
          >
            <source src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-sm text-gray-600 mt-2">This should work - it's a public sample video</p>
        </div>

        {/* Test with your Bunny CDN */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Test 2: Your Bunny Stream Video</h2>
          <video 
            controls 
            className="w-full rounded-lg"
            onError={(e) => console.error('Bunny video error:', e)}
            onLoadedData={() => console.log('Bunny video loaded successfully')}
          >
            <source src="https://vz-3e384f11-80b.b-cdn.net/ca956a44-5d85-46e8-ae54-c455a7e6ad74/original" type="video/mp4" />
            <source src="https://vz-3e384f11-80b.b-cdn.net/ca956a44-5d85-46e8-ae54-c455a7e6ad74/play_720p.mp4" type="video/mp4" />
            <source src="https://vz-3e384f11-80b.b-cdn.net/ca956a44-5d85-46e8-ae54-c455a7e6ad74/play_480p.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-sm text-gray-600 mt-2">Check console for errors. If 403, the video needs to be set to public in Bunny Stream</p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">To Fix 403 Error:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go to <a href="https://panel.bunny.net/" target="_blank" className="text-blue-600 underline">Bunny.net Panel</a></li>
            <li>Navigate to your Stream Library (ID: 491503)</li>
            <li>Find the video (ID: ca956a44-5d85-46e8-ae54-c455a7e6ad74)</li>
            <li>Click on the video to open settings</li>
            <li>Under "Security" or "Privacy", set it to "Public"</li>
            <li>Or, under "Security Settings" → "Allowed Referrers", add:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>localhost:3000</li>
                <li>localhost:3001</li>
                <li>reportfocusnews.com</li>
                <li>*.reportfocusnews.com</li>
              </ul>
            </li>
            <li>Save changes and refresh this page</li>
          </ol>
        </div>
      </div>
    </div>
  )
}