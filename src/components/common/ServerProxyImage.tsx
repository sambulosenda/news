import { getCDNImageUrl } from '@/lib/cdn';

interface ServerProxyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

/**
 * Server-side image component that immediately renders CDN URLs
 * This ensures Google crawlers see the actual image URL
 * Uses native img tag for better SSR compatibility
 */
export default function ServerProxyImage({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  priority = false,
}: ServerProxyImageProps) {
  // Generate CDN URL immediately for WordPress images
  const getImageUrl = () => {
    if (!src) return ''; // Return empty for no image
    
    // Convert to CDN URL for all images
    return getCDNImageUrl(src);
  };

  const imageUrl = getImageUrl();
  
  // Don't render if no image URL
  if (!imageUrl) {
    return (
      <div className={`bg-gray-100 ${fill ? 'absolute inset-0' : ''} ${className}`} 
           style={!fill ? { width: width || 800, height: height || 450 } : undefined}>
        <div className="flex items-center justify-center h-full text-gray-400">
          <span className="text-sm">No image available</span>
        </div>
      </div>
    );
  }

  // For fill mode - use native img for SSR
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

  // For fixed dimensions - use native img for SSR
  return (
    <img
      src={imageUrl}
      alt={alt}
      width={width || 800}
      height={height || 450}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}