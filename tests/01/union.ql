PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX geo: <http://www.geonames.org/ontology#>
PREFIX dbpowl: <http://dbpedia.org/ontology/>
PREFIX dbpprop: <http://dbpedia.org/property/>

SELECT DISTINCT ?var ?var0 ?var5 ?var6
WHERE {
  ?var0 rdfs:comment ?var1 . ?var0 foaf:page ?var .
  {
    { BIND (0 AS ?optlevel_) . } UNION { ?var0 dct:subject ?var6 . BIND (1 AS ?optlevel_) . } UNION { ?var0 dbpprop:industry ?var5 . BIND (2 AS ?optlevel_) . } UNION { ?var0 dct:subject ?var6 . ?var0 dbpprop:industry ?var5 . BIND (3 AS ?optlevel_) . }
  }
  BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 dct:subject ?opt_var6 . } AS ?optgroup1_) . BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 dbpprop:industry ?opt_var5 . } AS ?optgroup2_) . BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 dct:subject ?opt_var6 . ?opt_var0 dbpprop:industry ?opt_var5 . } AS ?optgroup3_) .
  FILTER (!(?optgroup1_ && ?optlevel_ in (0, 2))) FILTER (!(?optgroup2_ && ?optlevel_ in (0))) FILTER (!(?optgroup3_ && ?optlevel_ in (0, 1, 2)))
}