function parseUnion({queryCollection, selection, header, footer}) {

  const _parseUnionSelection = function(groupCollection) {
    let groupStrings = [];
    const groups = groupCollection.map(group => group.map(pref => pref.query));
    for (const [i, group] of groups.entries()) {
      groupStrings.push(`{${group.map(query => ` ${query} .`).join('')} BIND (${i} AS ?optlevel_) . } `);
    }
    return groupStrings.join('UNION ');
  }

  /**
   * returns true if first group dominates second one
   * or false otherwise
   */
  const _compareGroups = function(infGroup1, infGroup2) {
    for (let i = 0; i < infGroup1.length; i++) {
      let leftCounter = 0;
      infGroup1[i].forEach(preference => {
        if(!(infGroup2[i].includes(preference))) {
          leftCounter++;
        }
      });
      const difference = infGroup2[i].length - infGroup1[i].length +  leftCounter;
      const rightCounter = Math.max(difference, 0);
      if (leftCounter > 0 && rightCounter === 0) {
        return true;
      } else if(rightCounter > 0) {
        return false;
      }
    }
    console.warn('groups appear to be identical');
    return false;
  }

  const _parseUnionFilter = function(groupCollection, preferenceCollection) {
    const filter = [];
    const inflatedGroupCollection = groupCollection.map(group => _inflateGroup(group, preferenceCollection.length));
    inflatedGroupCollection.forEach((group, i) => {
      const dominating = [];
      inflatedGroupCollection.forEach((group2, j) => {
        if (i === j) {
          return;
        }
        if (_compareGroups(group, group2)) {
          dominating.push(j);
        }
      });
      if (dominating.length > 0) {
        filter.push(`FILTER (!(?optgroup${i}_ && ?optlevel_ in (${dominating.join(', ')}))) `);
      }
    });
    return filter.join('');
  }

  const requirementCollection = queryCollection.filter(query => typeof query === 'string');
  const preferenceCollection = queryCollection.filter(query => query instanceof Array);
  const groupCollection = _getGroups(preferenceCollection);

  const requirements = requirementCollection.join(' . ') + ' . ';
  const unionSelection = _parseUnionSelection(groupCollection);
  const groupQuery = _parseGroups(requirementCollection, groupCollection);
  const filter = _parseUnionFilter(groupCollection, preferenceCollection);

  return `  ${requirements}\n  {\n    ${unionSelection}\n  }\n  ${groupQuery}\n  ${filter}`;
}
