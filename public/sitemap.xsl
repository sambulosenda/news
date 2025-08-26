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
          .has-image {
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .image-preview {
            width: 60px;
            height: 40px;
            object-fit: cover;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
          }
          .image-indicator {
            display: inline-block;
            padding: 2px 6px;
            background: #10b981;
            color: white;
            font-size: 10px;
            border-radius: 3px;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Report Focus News - XML Sitemap</h1>
          <p class="stats">
            This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
          </p>
          
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Article</th>
                <th>Published</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="news:news/news:publication_date" order="descending"/>
                <tr>
                  <td>
                    <xsl:choose>
                      <xsl:when test="image:image/image:loc">
                        <img class="image-preview" src="{image:image/image:loc}" alt="{image:image/image:title}" loading="lazy"/>
                      </xsl:when>
                      <xsl:otherwise>
                        <div style="width: 60px; height: 40px; background: #f3f4f6; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #9ca3af;">
                          No image
                        </div>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td>
                    <a href="{sitemap:loc}" target="_blank" class="title">
                      <xsl:choose>
                        <xsl:when test="news:news/news:title">
                          <xsl:value-of select="news:news/news:title"/>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </a>
                    <xsl:if test="news:news/news:keywords">
                      <div class="keywords">
                        <xsl:value-of select="substring(news:news/news:keywords, 1, 100)"/>...
                      </div>
                    </xsl:if>
                  </td>
                  <td class="date">
                    <xsl:choose>
                      <xsl:when test="news:news/news:publication_date">
                        <xsl:value-of select="substring(news:news/news:publication_date, 1, 16)"/>
                      </xsl:when>
                      <xsl:when test="sitemap:lastmod">
                        <xsl:value-of select="substring(sitemap:lastmod, 1, 16)"/>
                      </xsl:when>
                    </xsl:choose>
                  </td>
                  <td style="font-size: 12px; color: #6b7280;">
                    <xsl:choose>
                      <xsl:when test="news:news/news:geo_locations">
                        <xsl:value-of select="news:news/news:geo_locations"/>
                      </xsl:when>
                      <xsl:otherwise>
                        -
                      </xsl:otherwise>
                    </xsl:choose>
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