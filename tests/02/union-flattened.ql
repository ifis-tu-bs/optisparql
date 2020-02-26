PREFIX dbpprop: <http://dbpedia.org/property/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?var ?var0 ?var1 ?var6 ?var7 ?var9
WHERE {
  ?var0 rdfs:comment ?var1 . ?var0 foaf:page ?var .
  {
    { BIND (0 AS ?optlevel_) . } UNION { ?var0 dct:subject ?var6 . BIND (1 AS ?optlevel_) . } UNION { ?var0 dbpprop:locationCity ?var9 . ?var0 dbpprop:manufacturer ?var0 . BIND (2 AS ?optlevel_) . } UNION { ?var0 dct:subject ?var6 . ?var0 dbpprop:locationCity ?var9 . ?var0 dbpprop:manufacturer ?var0 . BIND (3 AS ?optlevel_) . } UNION { ?var0 rdf:type ?var7 . BIND (4 AS ?optlevel_) . } UNION { ?var0 dct:subject ?var6 . ?var0 rdf:type ?var7 . BIND (5 AS ?optlevel_) . } UNION { ?var0 dbpprop:locationCity ?var9 . ?var0 dbpprop:manufacturer ?var0 . ?var0 rdf:type ?var7 . BIND (6 AS ?optlevel_) . } UNION { ?var0 dct:subject ?var6 . ?var0 dbpprop:locationCity ?var9 . ?var0 dbpprop:manufacturer ?var0 . ?var0 rdf:type ?var7 . BIND (7 AS ?optlevel_) . }
  }
  BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 dct:subject ?opt_var6 . } AS ?optgroup1_) . BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 dbpprop:locationCity ?opt_var9 . ?opt_var0 dbpprop:manufacturer ?opt_var0 . } AS ?optgroup2_) . BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 dct:subject ?opt_var6 . ?opt_var0 dbpprop:locationCity ?opt_var9 . ?opt_var0 dbpprop:manufacturer ?opt_var0 . } AS ?optgroup3_) . BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 rdf:type ?opt_var7 . } AS ?optgroup4_) . BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 dct:subject ?opt_var6 . ?opt_var0 rdf:type ?opt_var7 . } AS ?optgroup5_) . BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 dbpprop:locationCity ?opt_var9 . ?opt_var0 dbpprop:manufacturer ?opt_var0 . ?opt_var0 rdf:type ?opt_var7 . } AS ?optgroup6_) . BIND(EXISTS { ?opt_var0 rdfs:comment ?opt_var1 . ?opt_var0 foaf:page ?opt_var . ?opt_var0 dct:subject ?opt_var6 . ?opt_var0 dbpprop:locationCity ?opt_var9 . ?opt_var0 dbpprop:manufacturer ?opt_var0 . ?opt_var0 rdf:type ?opt_var7 . } AS ?optgroup7_) .
  FILTER (!(?optgroup1_ && ?optlevel_ in (0))) FILTER (!(?optgroup2_ && ?optlevel_ in (0))) FILTER (!(?optgroup3_ && ?optlevel_ in (0, 1, 2))) FILTER (!(?optgroup4_ && ?optlevel_ in (0))) FILTER (!(?optgroup5_ && ?optlevel_ in (0, 1, 4))) FILTER (!(?optgroup6_ && ?optlevel_ in (0, 2, 4))) FILTER (!(?optgroup7_ && ?optlevel_ in (0, 1, 2, 3, 4, 5, 6)))
}