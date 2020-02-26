PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?v ?v4 ?v6 ?v8 WHERE {
  ?v4 dct:subject ?v .
	?v4 foaf:name ?v6 .
	OPTIONAL { ?v4 rdfs:comment ?v8 . }
}