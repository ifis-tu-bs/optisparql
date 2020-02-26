function parseOptimal({queryCollection, selection, header, footer}) {
  const _parseOptimalQuery = function(queryCollection, isPreference = false) {
    let queryParts = [];
    queryCollection.forEach(query => {
      if (typeof query ===  'string') {
        queryParts.push(query + (isPreference ? '' : ' .'));
      } else if(query instanceof Array) {
        const brackets = query.length === 1 ? ['{', '. }'] : ['(', ')'];
        const preferences = _parseOptimalQuery(query, true);
        queryParts.push(`OPTIMAL ${brackets[0]} ${preferences} ${brackets[1]} `);
      } else {
        console.warn('invalid query type');
      }
    });
    return queryParts.join(isPreference ? ',\n  ' : '\n  ');
  };

  const queryString = _parseOptimalQuery(queryCollection);
  return `  ${queryString}`;
}
