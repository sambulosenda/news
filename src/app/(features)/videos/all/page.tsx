import { Metadata } from 'next'
import Link from 'next/link'
import { bunnyStream } from '@/lib/api/bunny-stream'
import HeaderWrapper from '@/components/layout/HeaderWrapper'
import Footer from '@/components/layout/Footer'
import VideoPageClient from '../video-page-client'

export const metadata: Metadata = {
  title: 'Video News - Latest Breaking News Videos | Report Focus News',
  description: 'Watch breaking news videos from South Africa & Zimbabwe. Latest video reports, interviews, and live coverage from Report Focus News.',
  keywords: 'video news, breaking news videos, SA news videos, Zimbabwe news videos, live news, video reports, news interviews',
  openGraph: {
    title: 'Video News - Latest Breaking News Videos | Report Focus News',
    description: 'Watch breaking news videos from South Africa & Zimbabwe. Latest video reports and live coverage.',
    type: 'website',
    url: 'https://reportfocusnews.com/videos/all',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video News - Latest Breaking News Videos',
    description: 'Watch breaking news videos from South Africa & Zimbabwe',
  },
}

export default async function AllVideosPage() {
  const { items: initialVideos, totalItems } = await bunnyStream.getVideos(1, 18, 'date')

  return (
    <>
      <HeaderWrapper />
      <main className="bg-white">
        <div className="container-wide py-8">
          <div className="mb-8">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-red-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Videos</span>
            </nav>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Video News
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Watch the latest breaking news videos, exclusive interviews, and in-depth analysis 
              from across South Africa and Zimbabwe.
            </p>
          </div>

          <VideoPageClient 
            initialVideos={initialVideos}
            totalItems={totalItems}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}