import { NextRequest, NextResponse } from 'next/server'
import { bunnyStream } from '@/lib/api/bunny-stream'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || undefined
    const collection = searchParams.get('collection') || undefined
    const orderBy = searchParams.get('orderBy') || 'date'

    const { items, totalItems } = await bunnyStream.getVideos(
      page,
      limit,
      orderBy,
      search,
      collection
    )

    return NextResponse.json({
      videos: items,
      totalItems,
      page,
      totalPages: Math.ceil(totalItems / limit)
    })
  } catch (error) {
    console.error('Error in videos API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}