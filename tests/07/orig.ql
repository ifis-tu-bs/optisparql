# Modified from https://aifb-ls3-kos.aifb.kit.edu/projects/spartiqulator/examples.htm

PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX res: <http://dbpedia.org/resource/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?uri ?actor ?actor2 ?parent ?spouse ?partner
WHERE {
	?uri rdf:type dbo:Film .
	?uri dbo:starring ?actor .
	?uri dbo:starring ?actor2. FILTER(?actor != ?actor2) .
	OPTIONAL { ?actor dbo:parent ?actor2 . BIND(1 AS ?parent) . }
	OPTIONAL { ?actor dbo:spouse ?actor2 . BIND(1 AS ?spouse) . }
	OPTIONAL { ?actor dbo:partner ?actor2 . BIND(1 AS ?partner) . }
}