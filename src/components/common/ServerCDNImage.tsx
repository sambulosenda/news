import { getCDNImageUrl } from '@/lib/cdn';

interface ServerCDNImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

/**
 * Server-side CDN image component for SSR/SSG
 * - No client-side state
 * - No fallback images for better SEO
 * - Returns null if no valid image
 */
export default function ServerCDNImage({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  priority = false,
}: ServerCDNImageProps) {
  // If no source, return null (no fallback)
  if (!src) {
    return null;
  }

  // Get CDN URL
  const imageUrl = getCDNImageUrl(src);
  
  // For fill mode
  if (fill) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={{ aspectRatio: '16/9' }}
      />
    );
  }

  // For fixed dimensions
  return (
    <img
      src={imageUrl}
      alt={alt}
      width={width || 1200}
      height={height || 675}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}