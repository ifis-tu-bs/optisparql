PREFIX dbpprop: <http://dbpedia.org/property/>

SELECT DISTINCT ?var ?var3 ?var4
WHERE {
  ?var dbpprop:divisions ?var4 . OPTIONAL { ?var dbpprop:subsid ?var3 . BIND (1 AS ?optvar0_) . }
  BIND(EXISTS { ?opt_var dbpprop:divisions ?opt_var4 . ?opt_var dbpprop:subsid ?opt_var3 . } AS ?optgroup1_) .
  FILTER (!?optgroup1_ || ((BOUND(?optvar0_))))
} 