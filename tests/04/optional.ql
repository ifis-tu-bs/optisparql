PREFIX dbpprop: <http://dbpedia.org/property/>

SELECT DISTINCT ?var ?var3 ?var4
WHERE {
  ?var dbpprop:subsid ?var3 . OPTIONAL { ?var dbpprop:divisions ?var4 . BIND (1 AS ?optvar0_) . }
  BIND(EXISTS { ?opt_var dbpprop:subsid ?opt_var3 . ?opt_var dbpprop:divisions ?opt_var4 . } AS ?optgroup1_) .
  FILTER (!?optgroup1_ || ((BOUND(?optvar0_))))
} 