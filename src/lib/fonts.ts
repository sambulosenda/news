// Optimized font configuration with local fallbacks for performance
// Using system fonts for optimal loading performance and Core Web Vitals

// Inter equivalent system font stack
export const interFallback = {
  variable: "--font-inter",
  style: {
    fontFamily: '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontDisplay: 'swap', // Critical for Core Web Vitals
  }
};

// Roboto equivalent system font stack  
export const robotoFallback = {
  variable: "--font-roboto",
  style: {
    fontFamily: '"Roboto", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontDisplay: 'swap', // Critical for Core Web Vitals
  }
};

// Font variables for CSS
export const fontVariables = `${interFallback.variable} ${robotoFallback.variable}`;

// CSS variables to inject for optimal font loading
export const fontStyles = `
  :root {
    ${interFallback.variable}: ${interFallback.style.fontFamily};
    ${robotoFallback.variable}: ${robotoFallback.style.fontFamily};
  }
  
  .font-inter {
    font-family: var(${interFallback.variable});
  }
  
  .font-roboto {
    font-family: var(${robotoFallback.variable});
  }
`;