<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msws="http://tempuri.org/">
  <xsl:output method="html" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" indent="yes"/>
  <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'" />
  <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
  <xsl:template match="/" name="fred">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <body>
        <table id="movieTable">
          <thead>
            <tr>
              <th>
                <span id="rtitle" class="filmheading">Remake</span>
              </th>
              <th>
                <span id="ryear" class="filmheading">Remake Year</span>
              </th>
              <th>
                <span id="fraction" class="filmheading">Fraction</span>
              </th>
              <th>
                <span id="stitle" class="filmheading">Title</span>
              </th>
              <th>
                <span id="syear" class="filmheading">Year</span>
              </th>
            </tr>
          </thead>
          <!-- the loop for the movies in the xml-->
          <xsl:for-each select="remakes/remake">
            <!-- the default sort, actually tablesort jquery plugin is used in the interface-->
            <xsl:sort select="rtitle"/>
            <tr>
              <td>
                <xsl:element name="a">
                  <xsl:attribute name="href">
                    http://www.imdb.com/find?q=<xsl:value-of select="rtitle"/>&amp;s=all
                  </xsl:attribute>
                  <xsl:attribute name="target">
                    _blank
                  </xsl:attribute>
                  <xsl:value-of select="rtitle"/>
                </xsl:element>
              </td>
              <td>
                <xsl:element name="a">
                  <xsl:attribute name="href">
                    http://en.wikipedia.org/wiki/Category:<xsl:value-of select="ryear"/>_films
                  </xsl:attribute>
                  <xsl:attribute name="target">
                    _blank
                  </xsl:attribute>
                  <xsl:value-of select="ryear"/>
                </xsl:element>
              </td>
              <td class="ratingCell">
                <div class="fractionvalue">
                  <xsl:value-of select="fraction"/>
                </div>
                <div>
                  <img class="ratingImg" src="css/5stars.png">
                    <xsl:attribute name="style">
                      clip:rect(0px,<xsl:value-of select="fraction*100" />px,100px,0px);
                    </xsl:attribute>
                  </img>
                </div>
              </td>
              <td>
                <xsl:element name="a">
                  <xsl:attribute name="href">
                    http://www.imdb.com/find?q=<xsl:value-of select="stitle"/>&amp;s=all
                  </xsl:attribute>
                  <xsl:attribute name="target">
                    _blank
                  </xsl:attribute>
                  <xsl:value-of select="stitle"/>
                </xsl:element>
              </td>
              <td>
                <xsl:element name="a">
                  <xsl:attribute name="href">
                    http://en.wikipedia.org/wiki/Category:<xsl:value-of select="syear"/>_films
                  </xsl:attribute>
                  <xsl:attribute name="target">
                    _blank
                  </xsl:attribute>
                  <xsl:value-of select="syear"/>
                </xsl:element>
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
  <!-- not used for now as JQuery handles no movies better in the developers view -->
  <xsl:template name="NoMovies">
    <tr>
      <td>no</td>
    </tr>
  </xsl:template>
</xsl:stylesheet>