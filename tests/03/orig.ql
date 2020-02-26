PREFIX dbpprop: <http://dbpedia.org/property/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?var ?var0 ?var1 ?var5 ?var10 ?var11 WHERE {
  ?var0 rdfs:comment ?var1 .
	?var0 foaf:page ?var .
	OPTIONAL { ?var0 dbpprop:industry ?var5 . }
	OPTIONAL {
		?var0 dbpprop:products ?var11 .
		?var0 dbpprop:model ?var0 .
	}
	OPTIONAL { ?var0 <http://www.georss.org/georss/point> ?var10 . }
}