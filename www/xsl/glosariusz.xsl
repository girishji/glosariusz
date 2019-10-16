<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>

  <xsl:template match="Frag">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/> -->
        <link rel="stylesheet" href="../css/bootstrap.css"/>
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
    <p><xsl:apply-templates/></p>
  </xsl:template>

  <xsl:template match="Token">
    <span class="h5 text-primary"><xsl:apply-templates/> </span>
  </xsl:template>

  <xsl:template match="Description">
    <span> <xsl:apply-templates/> </span>
  </xsl:template>

  <!-- ================================================== -->
  
  <xsl:template match="Figure">
    <div class="mb-3"><small><xsl:apply-templates/></small></div>
  </xsl:template>

  <xsl:template match="ImageData">
    <div><img class="p-4 img-fluid" src="../{@src}"/></div>
  </xsl:template>

  <!-- ================================================== -->
  
  <xsl:template match="Table">

    <div class="mx-4 py-4">
      <table class="table">

        <xsl:if test="Caption"> <!-- at least one caption exists -->
          <caption><xsl:value-of select="Caption"/></caption>
        </xsl:if>

        <xsl:choose>
          <xsl:when test="(count(TR) = 2) and (count(TR/TH) = 2)">
            <tr class="table-active"><th scope="col"><xsl:value-of select="(TR/TH)[1]"/></th></tr>
            <tr><td><xsl:value-of select="(TR/TH)[2]"/></td></tr>
          </xsl:when>

          <xsl:otherwise>
            <xsl:apply-templates select="TR"/>
          </xsl:otherwise>
        </xsl:choose>

      </table>
    </div>
  </xsl:template>

  <xsl:template match="TR">
    <xsl:choose>
      <xsl:when test="TD"> 
        <tr><xsl:apply-templates select="TH|TD"/></tr>
      </xsl:when>

      <xsl:otherwise>

        <xsl:choose>
          <xsl:when test="(count(TH) = 1)">
            <tr class="table-active">
              <xsl:call-template name="THSpanColumns"/>
            </tr>
          </xsl:when>

          <xsl:otherwise>
            <tr class="table-active"><xsl:apply-templates select="TH"/></tr>
          </xsl:otherwise>
        </xsl:choose>
            
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="TH">
    <th><xsl:value-of select="."/></th>
  </xsl:template>

  <xsl:template match="TD">
    <td><xsl:value-of select="."/></td>
  </xsl:template>

  <xsl:template name="THSpanColumns">
    <th colspan="99"><xsl:value-of select="."/></th>
  </xsl:template>

  <!-- ================================================== -->

  <xsl:template match="L">
    <xsl:choose>
      <!-- test whether a string contains a numeric value -->
      <xsl:when test="LI/Lbl and (translate((LI/Lbl)[1], '1234567890', '') != (LI/Lbl)[1])">
        <ol><xsl:apply-templates select="L|Caption|LI"/></ol>
      </xsl:when>
      <xsl:otherwise>
        <ul><xsl:apply-templates select="L|Caption|LI"/></ul>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="Caption">
    <p><small><xsl:value-of select="."/></small></p>
  </xsl:template>

  <xsl:template match="LI">
    <xsl:choose>
      <xsl:when test="LBody|Lbl">
        <xsl:apply-templates select="LBody|Lbl"/>
      </xsl:when>
      <xsl:otherwise>
        <p><xsl:value-of select="."/></p>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="Lbl">
  </xsl:template>

  <xsl:template match="LBody">
    <li><xsl:value-of select="."/></li>
  </xsl:template>

  <!-- ================================================== -->

  <xsl:template match="H1|H2|H3|H4|H5">
    <p><strong><xsl:apply-templates/></strong></p>
  </xsl:template>

  <xsl:template match="H6">
    <p><small><xsl:apply-templates/></small></p>
  </xsl:template>

  <xsl:template match="P">
    <p><xsl:apply-templates/></p>
  </xsl:template>

  <xsl:template match="Link">
    <i><xsl:apply-templates/></i>
  </xsl:template>

</xsl:stylesheet>






