import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { GET_MENU_CATEGORIES } from '@/lib/queries/categories';

export async function GET() {
  try {
    const categoriesData = await fetchGraphQL(GET_MENU_CATEGORIES);
    const categories = categoriesData?.categories?.nodes || [];
    
    return NextResponse.json({ categories }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { categories: [], error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}