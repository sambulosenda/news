import { getCDNImageUrl, getOptimizedImageUrl, getWebPImageUrl } from '@/lib/cdn';

interface ServerProxyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

/**
 * Server-side image component with responsive srcset support
 * Optimized for Google News and Core Web Vitals
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
  sizes,
}: ServerProxyImageProps) {
  // Generate CDN URL immediately for WordPress images
  const getImageUrl = () => {
    if (!src) return ''; // Return empty for no image
    
    // Convert to CDN URL for all images
    return getCDNImageUrl(src);
  };

  // Generate srcset for responsive images with optional format
  const generateSrcSet = (baseUrl: string, format?: 'webp' | 'jpeg') => {
    // Define responsive breakpoints for optimal loading
    // These cover mobile to 4K displays
    const widths = [320, 640, 768, 1024, 1280, 1536, 1920, 2560];
    
    return widths
      .map(w => {
        const optimizedUrl = format === 'webp' 
          ? getWebPImageUrl(baseUrl, { width: w, quality: 85 })
          : getOptimizedImageUrl(baseUrl, { width: w, quality: 90 });
        return `${optimizedUrl} ${w}w`;
      })
      .join(', ');
  };

  // Generate sizes attribute if not provided
  const getSizes = () => {
    if (sizes) return sizes;
    
    // Default responsive sizes for article images
    if (fill) {
      return '100vw';
    }
    
    // For fixed width images, provide responsive sizes
    return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 80vw, 1200px';
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

  // Generate responsive srcsets for WebP and JPEG
  const webpSrcSet = generateSrcSet(src, 'webp');
  const jpegSrcSet = generateSrcSet(src, 'jpeg');
  const sizesAttr = getSizes();

  // For fill mode - use picture element with WebP and JPEG sources
  if (fill) {
    return (
      <picture>
        <source
          type="image/webp"
          srcSet={webpSrcSet}
          sizes={sizesAttr}
        />
        <source
          type="image/jpeg"
          srcSet={jpegSrcSet}
          sizes={sizesAttr}
        />
        <img
          src={imageUrl}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{ aspectRatio: '16/9' }}
        />
      </picture>
    );
  }

  // For fixed dimensions - use picture element with WebP and JPEG sources
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={sizesAttr}
      />
      <source
        type="image/jpeg"
        srcSet={jpegSrcSet}
        sizes={sizesAttr}
      />
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
    </picture>
  );
}