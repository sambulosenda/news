#!/usr/bin/env node

/**
 * SEO URL Monitoring Script for Report Focus News
 * Monitors for malformed URLs and potential SEO issues
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_DOMAIN = 'reportfocusnews.com';
const MONITORING_LOG = path.join(__dirname, 'url-monitoring.log');

// Malformed URL patterns to monitor
const MALFORMED_PATTERNS = [
  '/search/.*/page/.*/www',
  '/search/.*/page/.*/',
  '/search/.*/.*/.*',
  '.*/page/.*/www.*'
];

// Google Search Console API simulation (manual checks)
const GOOGLE_SEARCH_QUERIES = [
  `site:${SITE_DOMAIN} "/search/" -inurl:"?q="`,
  `site:${SITE_DOMAIN} "search" "page" "www"`,
  `site:${SITE_DOMAIN} inurl:"/search/" -inurl:"?q"`,
  `site:${SITE_DOMAIN} inurl:"/page/" inurl:"www"`
];

class URLMonitor {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      malformedUrls: [],
      redirectTests: [],
      seoIssues: []
    };
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${message}\n`;
    
    console.log(message);
    fs.appendFileSync(MONITORING_LOG, logEntry);
  }

  async testRedirects() {
    const testUrls = [
      '/search/Donald+trump/page/42/www.',
      '/search/politics/page/1/www',
      '/search/covid/testing/more',
      '/search/economy/page/5/'
    ];

    this.log('Testing redirect behavior for malformed URLs...');

    for (const testPath of testUrls) {
      try {
        const result = await this.makeRequest(testPath);
        this.results.redirectTests.push({
          url: testPath,
          statusCode: result.statusCode,
          redirectLocation: result.redirectLocation,
          isFixed: result.statusCode === 301 && result.redirectLocation?.includes('/search?q=')
        });
        
        this.log(`${testPath}: ${result.statusCode} -> ${result.redirectLocation || 'No redirect'}`);
      } catch (error) {
        this.log(`Error testing ${testPath}: ${error.message}`);
      }
    }
  }

  async checkRobotsTxt() {
    this.log('Checking robots.txt configuration...');
    
    try {
      const robotsContent = await this.makeRequest('/robots.txt');
      const content = robotsContent.body || '';
      
      const requiredRules = [
        'Disallow: /search/*/page/',
        'Disallow: /search/*/*',
        'Disallow: /search/*/www'
      ];
      
      let missingRules = [];
      requiredRules.forEach(rule => {
        if (!content.includes(rule)) {
          missingRules.push(rule);
        }
      });
      
      if (missingRules.length > 0) {
        this.results.seoIssues.push({
          type: 'robots.txt',
          issue: 'Missing disallow rules',
          details: missingRules
        });
        this.log(`WARNING: Missing robots.txt rules: ${missingRules.join(', ')}`);
      } else {
        this.log('✓ Robots.txt properly configured');
      }
    } catch (error) {
      this.log(`Error checking robots.txt: ${error.message}`);
    }
  }

  async makeRequest(path) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: SITE_DOMAIN,
        port: 443,
        path: path,
        method: 'HEAD',
        headers: {
          'User-Agent': 'SEO-Monitor/1.0 (Report Focus News URL Monitor)'
        }
      };

      const req = https.request(options, (res) => {
        resolve({
          statusCode: res.statusCode,
          redirectLocation: res.headers.location,
          body: ''
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    });
  }

  generateGoogleSearchCommands() {
    this.log('\nGoogle Search Console queries to run manually:');
    this.log('================================================');
    
    GOOGLE_SEARCH_QUERIES.forEach((query, index) => {
      this.log(`${index + 1}. ${query}`);
    });
    
    this.log('\nRun these searches in Google and check for results.');
    this.log('If any malformed URLs appear, submit removal requests in Search Console.');
  }

  async checkCanonicalUrls() {
    this.log('Checking canonical URL implementation...');
    
    const testSearchUrls = [
      '/search?q=politics',
      '/search?q=economy',
      '/search' // Empty search
    ];
    
    // Note: This would need full HTTP response parsing to check <link rel="canonical">
    // For now, we'll just verify the URLs are accessible
    for (const url of testSearchUrls) {
      try {
        const result = await this.makeRequest(url);
        if (result.statusCode !== 200) {
          this.results.seoIssues.push({
            type: 'canonical',
            issue: 'Search page not accessible',
            url: url,
            statusCode: result.statusCode
          });
        }
      } catch (error) {
        this.log(`Error checking ${url}: ${error.message}`);
      }
    }
  }

  generateReport() {
    const report = {
      summary: {
        timestamp: this.results.timestamp,
        totalIssues: this.results.seoIssues.length,
        redirectsWorking: this.results.redirectTests.filter(t => t.isFixed).length,
        totalRedirectTests: this.results.redirectTests.length
      },
      details: this.results
    };
    
    const reportPath = path.join(__dirname, `seo-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    this.log(`\nReport saved to: ${reportPath}`);
    this.log(`Issues found: ${this.results.seoIssues.length}`);
    this.log(`Redirects working: ${this.results.redirectTests.filter(t => t.isFixed).length}/${this.results.redirectTests.length}`);
    
    return report;
  }

  async run() {
    this.log('Starting SEO URL monitoring...');
    this.log('================================');
    
    await this.testRedirects();
    await this.checkRobotsTxt();
    await this.checkCanonicalUrls();
    
    this.generateGoogleSearchCommands();
    this.generateReport();
    
    this.log('\nMonitoring completed!');
  }
}

// Run the monitor if called directly
if (require.main === module) {
  const monitor = new URLMonitor();
  monitor.run().catch(console.error);
}

module.exports = URLMonitor;