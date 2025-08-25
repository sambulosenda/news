import { permanentRedirect } from 'next/navigation';

// This page handles old category URL structure and redirects to new /news/ URLs
export default async function OldCategoryRedirect({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Permanent redirect to new URL structure
  permanentRedirect(`/news/${slug}/`);
}