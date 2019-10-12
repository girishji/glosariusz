<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="Frag">
    <html>
      <head>
        <title>
          <xsl:value-of select="Token"/>
        </title>
      </head>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="Main">
    <div class="xxx">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

  <xsl:template match="content">
    <p align="center"> <xsl:apply-templates/> </p>
  </xsl:template>

  <xsl:template match="comment">
    <hr/> <i><xsl:apply-templates/> </i>
  </xsl:template>
</xsl:stylesheet>