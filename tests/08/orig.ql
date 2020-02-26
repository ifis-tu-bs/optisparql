# Modified from https://aifb-ls3-kos.aifb.kit.edu/projects/spartiqulator/examples.htm

PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT DISTINCT ?company ?uri ?parent ?place
WHERE {
	?company rdf:type dbo:Organisation  .
	?uri dbo:developer ?company .
	OPTIONAL { ?uri rdf:type dbo:Software . }
	OPTIONAL { ?company dbo:foundationPlace ?place . }
	OPTIONAL { ?company dbo:parentCompany ?parent . }
}