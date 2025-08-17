import fs from 'fs';
import path from 'path';

export function getCriticalCSS() {
  // In production, read the critical CSS file once
  if (process.env.NODE_ENV === 'production') {
    try {
      const cssPath = path.join(process.cwd(), 'src/app/critical.css');
      return fs.readFileSync(cssPath, 'utf8');
    } catch (error) {
      console.error('Failed to load critical CSS:', error);
      return '';
    }
  }
  
  // In development, return minimal critical CSS
  return `
    /* Minimal critical CSS for development */
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
    .container-wide { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
    .container-content { max-width: 1024px; margin: 0 auto; padding: 0 1rem; }
    header { background: white; border-bottom: 2px solid #111827; }
    .font-serif { font-family: Georgia, serif; }
    .font-bold { font-weight: 700; }
  `;
}

export default function CriticalCSS() {
  const css = getCriticalCSS();
  
  return (
    <style
      dangerouslySetInnerHTML={{ __html: css }}
      data-critical="true"
    />
  );
}