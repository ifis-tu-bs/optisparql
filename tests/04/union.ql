PREFIX dbpprop: <http://dbpedia.org/property/>

SELECT DISTINCT ?var ?var3 ?var4
WHERE {
  ?var dbpprop:subsid ?var3 .
  {
    { BIND (0 AS ?optlevel_) . } UNION { ?var dbpprop:divisions ?var4 . BIND (1 AS ?optlevel_) . }
  }
  BIND(EXISTS { ?opt_var dbpprop:subsid ?opt_var3 . ?opt_var dbpprop:divisions ?opt_var4 . } AS ?optgroup1_) .
  FILTER (!(?optgroup1_ && ?optlevel_ in (0)))
} 