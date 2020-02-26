const demoHeaders =
`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX geo: <http://www.geonames.org/ontology#>
PREFIX dbpowl: <http://dbpedia.org/ontology/>
PREFIX dbpprop: <http://dbpedia.org/property/>`;

const demoQuery = {
  queryCollection: [
    "?var0 rdfs:comment ?var1",
    "?var0 foaf:page ?var",
    [
      "?var0 dct:subject ?var6"
    ],
    [
      "?var0 dbpprop:industry ?var5"
    ]
  ],
  selection: '?var ?var0 ?var5 ?var6',
  header: demoHeaders,
  footer: ''
};

function _create2DArray(size) {
	return Array.from(new Array(size), () => []);
}

function _cartesianProduct(arr) {
  // found at https://js-algorithms.tutorialhorizon.com/2015/10/23/combinations-of-an-array/
  // modified to return arrays instead of strings
  let result = [];
  let arrLen = arr.length;
  let combinations = Math.pow(2, arrLen);

  // Time & Space Complexity O (n * 2^n)
  for (let i = 0; i < combinations;  i++) {
    let temp = [];
    for (let j = 0; j < arrLen; j++) {
      // & is bitwise AND
      if ((i & Math.pow(2, j))) {
        temp.push(arr[j]);
      }
    }
    result.push(temp);
  }
  return result;
}

function _getGroups(preferenceCollection) {
  const referencedPreferences = preferenceCollection.reduce(
    (acc, optimalQuery, i) =>
      acc.concat(optimalQuery.map(pref => ({query: pref, optimal: i}))),
  []);
  return _cartesianProduct(referencedPreferences);
}

function _parseGroups(requirements, groupCollection) {
  let queryString = '';
  const groups = groupCollection.slice(1).map(group => group.map(pref => pref.query));
  for (const [i, group] of groups.entries()) {
    const groupCollection = [...requirements, ...group]
      .map(query => query.replace(/\?/g, '?opt_'));
    queryString += `BIND(EXISTS { ${groupCollection.join(' . ')} . } AS ?optgroup${i + 1}_) . `;
  }
  return queryString;
}

function _inflateGroup(group, size) {
  return group.reduce((acc, val) => {
      acc[val.optimal].push(val.query);
      return acc;
    },
    _create2DArray(size)
  );
}

function wrapQuery(queryString, {selection, header, footer}) {
	return `${header} \n\nSELECT DISTINCT ${selection} \nWHERE { \n${queryString} \n} \n${footer}`;
}

function countResults(queryString, {selection, header, footer}) {
	const query = `SELECT DISTINCT ${selection} \nWHERE { \n${queryString} \n} \n${footer}`;
	return `${header} \n\nSELECT COUNT(*) AS ?c WHERE { \n${query}}`;
}

function countVariables(queryString, {selection, header, footer}) {
	const query = `SELECT DISTINCT ${selection} \nWHERE {\n${queryString} \n} \n${footer}`;
	const varCount = selection.split(' ').reduce((str, attr) => `${str} COUNT(${attr}) AS ?c_${attr.substr(1)}`, '')
	return `${header} \n\nSELECT COUNT(*) AS ?c${varCount} WHERE { \n${query}}`;
}