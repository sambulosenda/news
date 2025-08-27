/**
 * Script loading utilities for Core Web Vitals optimization
 * Delays non-critical scripts until after user interaction
 */

// Track if user has interacted
let hasInteracted = false;

// Scripts to load on interaction
const deferredScripts: (() => void)[] = [];

/**
 * Initialize interaction listeners
 */
export function initScriptLoader() {
  if (typeof window === 'undefined') return;
  
  // Events that indicate user interaction
  const interactionEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];
  
  const handleInteraction = () => {
    if (hasInteracted) return;
    hasInteracted = true;
    
    // Remove listeners
    interactionEvents.forEach(event => {
      window.removeEventListener(event, handleInteraction);
    });
    
    // Load deferred scripts
    deferredScripts.forEach(loadScript => loadScript());
    deferredScripts.length = 0;
  };
  
  // Add listeners
  interactionEvents.forEach(event => {
    window.addEventListener(event, handleInteraction, { once: true, passive: true });
  });
  
  // Also load after 5 seconds regardless
  setTimeout(handleInteraction, 5000);
}

/**
 * Load script immediately or defer until interaction
 */
export function loadScript(
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    onInteraction?: boolean;
    onLoad?: () => void;
    id?: string;
  } = {}
) {
  const { async = true, defer = false, onInteraction = false, onLoad, id } = options;
  
  const load = () => {
    // Check if script already exists
    if (id && document.getElementById(id)) {
      onLoad?.();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    if (id) script.id = id;
    script.async = async;
    script.defer = defer;
    
    if (onLoad) {
      script.onload = onLoad;
    }
    
    document.body.appendChild(script);
  };
  
  if (onInteraction && !hasInteracted) {
    deferredScripts.push(load);
  } else {
    load();
  }
}

/**
 * Preload resource for faster loading
 */
export function preloadResource(href: string, as: 'script' | 'style' | 'font' | 'image') {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  
  // Add crossorigin for fonts
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  
  document.head.appendChild(link);
}

/**
 * Prefetch resource for future navigation
 */
export function prefetchResource(href: string) {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Load Google Analytics after interaction
 */
export function loadGoogleAnalytics(measurementId: string) {
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`, {
    onInteraction: true,
    id: 'google-analytics',
    onLoad: () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', measurementId);
    }
  });
}

// Declare global types
declare global {
  interface Window {
    dataLayer: any[];
  }
}