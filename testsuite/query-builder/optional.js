function parseOptional({queryCollection, selection, header, footer}) {
  let preferenceCounter = 0;
  const _parseOptionalList = function(queryCollection) {
    let queryString = '';
    queryCollection.forEach(query => {
      if (typeof query ===  'string') {
        let bindVar = `BIND (1 AS ?optvar${preferenceCounter}_) .`;
        preferenceCounter++;
        queryString += `OPTIONAL { ${query} . ${bindVar} } `;
      } else if(query instanceof Array) {
        queryString += _parseOptionalList(query);
      } else {
        console.warn('invalid query type');
      }
    });
    return queryString;
  };

	const _buildFilterMethod = function(groupPreferences, dominatingPreferences) {
		const groups = groupPreferences[0].map(pref => `BOUND(?optvar${pref}_)`).join(' && ');
		const dominating = dominatingPreferences[0].map(pref => `BOUND(?optvar${pref}_)`).join(' || ');
		const nextOpt = groupPreferences.length > 1 ? _buildFilterMethod(groupPreferences.slice(1), dominatingPreferences.slice(1)) : '';
		const separator = groupPreferences[0].length > 0 && groupPreferences.length > 1 && groupPreferences.slice(1).flat().length > 0 ? ' && ' : '';

		if(groupPreferences[0].length > 0 && dominatingPreferences[0].length > 0) {
			return `((${groups})${separator}${nextOpt}) || (${dominating})`;
		} else if(groupPreferences[0].length > 0) {
			return `((${groups})${separator}${nextOpt})`;
		} else if(nextOpt.length === 0) {
			return '';
		} else if(dominatingPreferences[0].length > 0) {
			return `(${nextOpt} || (${dominating}))`;
		} else {
			return nextOpt;
		}
	}

  const _parseOptionalFilters = function(preferenceCollection, groupCollection) {
    let queryString = '';
    for (const [groupId, group] of groupCollection.slice(1).entries()) {

			const groupPreferences = _create2DArray(preferenceCollection.length);
			const dominatingPreferences = _create2DArray(preferenceCollection.length);
      const inflatedGroup = _inflateGroup(group, preferenceCollection.length);

      for (const [optId, optimalQuery] of preferenceCollection.entries()) {
        optimalQuery.forEach((query, i) => {
          const queryId = i + preferenceCollection
            .slice(0, optId)
            .map(group => group.length)
            .reduce((acc, val) => acc + val, 0);
          if (inflatedGroup[optId].includes(query)) {
            groupPreferences[optId].push(queryId);
          } else {
            dominatingPreferences[optId].push(queryId);
          }
        });
      }
			const filter = _buildFilterMethod(groupPreferences, dominatingPreferences);
      queryString += `FILTER (!?optgroup${groupId + 1}_ || ${filter}) `;
    }
    return queryString;
  }

  let queryString = '';
  for(const query of queryCollection) {
    if (typeof query ===  'string') {
      queryString += query + ' . ';
    } else if(query instanceof Array) {
      queryString += _parseOptionalList(query);
    } else {
      console.warn('invalid query type');
    }
  }

  const requirementCollection = queryCollection.filter(query => typeof query === 'string');
  const preferenceCollection = queryCollection.filter(query => query instanceof Array);
  const groupCollection = _getGroups(preferenceCollection);

  const groupQuery = _parseGroups(requirementCollection, groupCollection);
  const filterQuery = _parseOptionalFilters(preferenceCollection, groupCollection);
  return `  ${queryString}\n  ${groupQuery}\n  ${filterQuery}`;
}
