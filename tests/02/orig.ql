PREFIX dbpprop: <http://dbpedia.org/property/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?var ?var0 ?var1 ?var6 ?var7 ?var9 WHERE {
  ?var0 rdfs:comment ?var1 .
	?var0 foaf:page ?var .
	OPTIONAL { ?var0 dct:subject ?var6 . }
	OPTIONAL {
		?var0 dbpprop:locationCity ?var9 .
		?var0 dbpprop:manufacturer ?var0 .
	}
	OPTIONAL { ?var0 rdf:type ?var7 . }
}