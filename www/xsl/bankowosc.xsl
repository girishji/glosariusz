<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:template match="Frag">
    <html>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        <title>
          <xsl:value-of select="Main/Token"/>
        </title>
      </head>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="Main">
    <p>
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <xsl:template match="Token">
    <span class="h5"> <xsl:apply-templates/> </span>
  </xsl:template>

  <xsl:template match="Description">
    <span> <xsl:apply-templates/> </span>
  </xsl:template>
    
  <xsl:template match="content">
    <p align="center"> <xsl:apply-templates/> </p>
  </xsl:template>

  <xsl:template match="comment">
    <hr/> <i><xsl:apply-templates/> </i>
  </xsl:template>
</xsl:stylesheet>
