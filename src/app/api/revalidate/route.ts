import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Secret to validate revalidation requests
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'your-secret-token';

export async function POST(request: NextRequest) {
  try {
    // Check for secret to confirm this is a valid request
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Get the path or tag to revalidate
    const path = request.nextUrl.searchParams.get('path');
    const tag = request.nextUrl.searchParams.get('tag');
    const type = request.nextUrl.searchParams.get('type');

    if (type === 'breaking-news' || type === 'all') {
      // Revalidate all news pages for breaking news
      revalidatePath('/', 'layout'); // Revalidate all pages
      revalidatePath('/');
      revalidatePath('/news/[category]', 'page');
      revalidateTag('posts');
      
      return NextResponse.json({ 
        revalidated: true, 
        type: 'breaking-news',
        message: 'All news pages revalidated for breaking news' 
      });
    }

    if (path) {
      // Revalidate a specific path
      revalidatePath(path);
      
      // Also revalidate homepage and category pages when article updates
      if (path.includes('/20')) { // Article URL pattern
        revalidatePath('/');
        revalidatePath('/news/[category]', 'page');
      }
      
      return NextResponse.json({ 
        revalidated: true, 
        path,
        message: `Path ${path} revalidated` 
      });
    }

    if (tag) {
      // Revalidate by tag
      revalidateTag(tag);
      return NextResponse.json({ 
        revalidated: true, 
        tag,
        message: `Tag ${tag} revalidated` 
      });
    }

    return NextResponse.json({ 
      message: 'No path or tag provided' 
    }, { status: 400 });

  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ 
      message: 'Error revalidating' 
    }, { status: 500 });
  }
}

// Also support GET for easy testing (remove in production)
export async function GET(request: NextRequest) {
  return POST(request);
}