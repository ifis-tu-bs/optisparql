PREFIX dbpprop: <http://dbpedia.org/property/>

SELECT DISTINCT ?var ?var3 ?var4
WHERE {
  ?var dbpprop:divisions ?var4 .
  OPTIMAL { ?var dbpprop:subsid ?var3 . }
} 