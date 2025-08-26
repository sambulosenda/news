<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>Report Focus News - News Sitemap</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f9fafb;
            color: #111827;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 10px;
            color: #111827;
          }
          .stats {
            color: #6b7280;
            margin-bottom: 30px;
            font-size: 14px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            text-align: left;
            padding: 12px;
            background: #f3f4f6;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            color: #6b7280;
            border-bottom: 1px solid #e5e7eb;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #f3f4f6;
            font-size: 14px;
          }
          tr:hover {
            background: #f9fafb;
          }
          a {
            color: #dc2626;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .date {
            color: #6b7280;
            font-size: 13px;
          }
          .title {
            font-weight: 500;
            color: #111827;
          }
          .keywords {
            color: #6b7280;
            font-size: 12px;
          }
          .image-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            margin-right: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Report Focus News - News Sitemap</h1>
          <p class="stats">
            This news sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> articles 
            from the last 7 days for Google News indexing.
          </p>
          
          <table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Published</th>
                <th>Keywords</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="news:news/news:publication_date" order="descending"/>
                <tr>
                  <td>
                    <a href="{sitemap:loc}" target="_blank" class="title">
                      <xsl:value-of select="news:news/news:title"/>
                    </a>
                  </td>
                  <td class="date">
                    <xsl:value-of select="substring(news:news/news:publication_date, 1, 10)"/>
                  </td>
                  <td class="keywords">
                    <xsl:value-of select="news:news/news:keywords"/>
                  </td>
                  <td>
                    <xsl:if test="image:image/image:loc">
                      <span class="image-indicator" title="Has image"></span>
                    </xsl:if>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>