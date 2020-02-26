PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?v ?v4 ?v6 ?v8
WHERE {
  ?v4 dct:subject ?v . ?v4 foaf:name ?v6 . OPTIONAL { ?v4 rdfs:comment ?v8 . BIND (1 AS ?optvar0_) . }
  BIND(EXISTS { ?opt_v4 dct:subject ?opt_v . ?opt_v4 foaf:name ?opt_v6 . ?opt_v4 rdfs:comment ?opt_v8 . } AS ?optgroup1_) .
  FILTER (!?optgroup1_ || ((BOUND(?optvar0_))))
}