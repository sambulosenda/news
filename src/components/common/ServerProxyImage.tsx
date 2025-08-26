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
 * Server-side image component that immediately renders the correct proxy URL
 * This ensures Google crawlers see the actual image, not a fallback
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
  // Generate proxy URL immediately for WordPress images
  const getImageUrl = () => {
    if (!src) return ''; // Return empty for no image
    
    // If it's a WordPress backend image, proxy it
    if (src.includes('backend.reportfocusnews.com')) {
      return `/api/image-proxy?url=${encodeURIComponent(src)}`;
    }
    
    // Use original URL for non-WordPress images
    return src;
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
        decoding="async"
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
      decoding="async"
    />
  );
}