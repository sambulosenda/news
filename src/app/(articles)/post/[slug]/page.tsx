import { redirect, permanentRedirect } from 'next/navigation';
import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { GET_POST_BY_SLUG } from '@/lib/queries/posts';
import { format } from 'date-fns';

// This page handles old URL structure and redirects to new date-based URLs
export default async function OldPostRedirect({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Fetch the post to get its date
  const data = await fetchGraphQL(GET_POST_BY_SLUG, { slug });
  
  if (!data?.postBy) {
    // If post not found, redirect to 404
    redirect('/404');
  }
  
  const post = data.postBy;
  const postDate = new Date(post.date);
  const year = format(postDate, 'yyyy');
  const month = format(postDate, 'MM');
  const day = format(postDate, 'dd');
  
  // Permanent redirect to new URL structure
  permanentRedirect(`/${year}/${month}/${day}/${slug}/`);
}