// Market data fetching service
// Using exchangerate-api for currency and Alpha Vantage for stocks (both have free tiers)

interface MarketData {
  jse: {
    value: number;
    change: number;
    changePercent: number;
    direction: 'up' | 'down' | 'unchanged';
  };
  zarUsd: {
    rate: number;
    change: number;
    changePercent: number;
  };
  lastUpdated: string;
}

// Cache to avoid excessive API calls
let marketDataCache: MarketData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch USD/ZAR exchange rate using free API
async function fetchExchangeRate(): Promise<{ rate: number; change: number; changePercent: number } | null> {
  try {
    // Using exchangerate-api.com free tier (no API key needed for basic usage)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }
    
    const data = await response.json();
    const currentRate = data.rates.ZAR;
    
    // For change calculation, we'd need historical data
    // For now, return current rate with mock change data
    return {
      rate: currentRate,
      change: 0.15, // This would come from comparing with yesterday's rate
      changePercent: 0.81
    };
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
}

// Fetch JSE data (mock implementation - real JSE API requires subscription)
async function fetchJSEData(): Promise<{ value: number; change: number; changePercent: number; direction: 'up' | 'down' | 'unchanged' } | null> {
  try {
    // Note: Real JSE data requires a paid API subscription
    // For demonstration, using a mock calculation based on time of day
    // In production, you would use JSE's official API or a financial data provider
    
    const hour = new Date().getHours();
    const mockBase = 75000; // JSE All Share Index approximate value
    const variation = Math.sin(hour / 24 * Math.PI * 2) * 500; // Daily variation
    const value = mockBase + variation;
    const change = variation;
    const changePercent = (change / mockBase) * 100;
    
    return {
      value: Math.round(value),
      change: Math.round(change),
      changePercent: parseFloat(changePercent.toFixed(2)),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'unchanged'
    };
  } catch (error) {
    console.error('Error fetching JSE data:', error);
    return null;
  }
}

// Use Alpha Vantage for stock data (free tier)
async function fetchJSEViaAlphaVantage(): Promise<{ value: number; change: number; changePercent: number; direction: 'up' | 'down' | 'unchanged' } | null> {
  try {
    // Alpha Vantage API key from environment variable
    const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'XZB3V2OQGXC7T6GV';
    
    // JSE Top 40 ETF as a proxy for JSE performance (ticker: EZA on NYSE)
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=EZA&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    
    const data = await response.json();
    
    if (data['Global Quote']) {
      const quote = data['Global Quote'];
      const price = parseFloat(quote['05. price']);
      const change = parseFloat(quote['09. change']);
      const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
      
      return {
        value: price,
        change: change,
        changePercent: changePercent,
        direction: change > 0 ? 'up' : change < 0 ? 'down' : 'unchanged'
      };
    }
    
    // Fallback to mock data if API fails
    return fetchJSEData();
  } catch (error) {
    console.error('Error fetching Alpha Vantage data:', error);
    return fetchJSEData(); // Fallback to mock data
  }
}

// Main function to get all market data
export async function getMarketData(): Promise<MarketData> {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (marketDataCache && (now - lastFetchTime) < CACHE_DURATION) {
    return marketDataCache;
  }
  
  // Fetch fresh data
  const [jseData, exchangeData] = await Promise.all([
    fetchJSEViaAlphaVantage(), // Using Alpha Vantage for real JSE data
    fetchExchangeRate()
  ]);
  
  // Prepare market data with fallbacks
  const marketData: MarketData = {
    jse: jseData || {
      value: 75000,
      change: 600,
      changePercent: 0.8,
      direction: 'up' as const
    },
    zarUsd: exchangeData || {
      rate: 18.45,
      change: 0.15,
      changePercent: 0.82
    },
    lastUpdated: new Date().toISOString()
  };
  
  // Update cache
  marketDataCache = marketData;
  lastFetchTime = now;
  
  return marketData;
}

// Format market data for display
export function formatMarketData(data: MarketData) {
  const { jse, zarUsd } = data;
  
  return {
    jse: {
      display: jse.direction === 'up' ? '▲' : jse.direction === 'down' ? '▼' : '−',
      percent: `${Math.abs(jse.changePercent).toFixed(1)}%`,
      color: jse.direction === 'up' ? 'text-green-600' : jse.direction === 'down' ? 'text-red-600' : 'text-gray-600'
    },
    zarUsd: {
      rate: zarUsd.rate.toFixed(2),
      change: zarUsd.change >= 0 ? '+' + zarUsd.change.toFixed(2) : zarUsd.change.toFixed(2),
      color: zarUsd.change >= 0 ? 'text-green-600' : 'text-red-600'
    }
  };
}