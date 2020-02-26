PREFIX dbpprop: <http://dbpedia.org/property/>

SELECT DISTINCT ?var ?var3 ?var4 WHERE {
  ?var dbpprop:subsid ?var3 .
	OPTIONAL { ?var dbpprop:divisions ?var4 . }
}