const sparqlEndpoint = 'http://dbpedia.org/sparql';

const defaultConfig = {
  "method": "GET",
  "mode": "cors",
  "cache": "no-cache",
  "credentials": "omit",
  "referrerPolicy": "no-referrer"
};

const defaultParams = {
  "default-graph-uri": "",
  "format": "application/sparql-results+json",
  "timeout": "0",
  "run": " Run Query ",
	"CXML_redir_for_subjs": "121",
	"CXML_redir_for_hrefs": ""
};

function delay(ms) {
	return new Promise(resolve => window.setTimeout(resolve, ms));
}

function _buildURL(query, params = {}) {
  const url = new URL(sparqlEndpoint);
  const mergedParams = Object.assign({}, defaultParams, params, {query});
  Object.keys(mergedParams).forEach(key => url.searchParams.append(key, mergedParams[key]));
  return url;
}

function _doHTTPRequest(query, params = {}, config = {}) {
  const url = _buildURL(query, params);
  const mergedConfig = Object.assign({}, defaultConfig, config);
  return fetch(url, mergedConfig);
}

function _analyseRequest(url) {
  const resources = window.performance.getEntriesByName(url);
	if (resources.length < 1)  {
		return;
	}
	console.info("Query performance", url, resources[resources.length - 1]);
	return resources[resources.length - 1].duration;
}

async function runTest({optional, union}, query) {
  const replies = await Promise.all([
    _doHTTPRequest(countResults(optional, query)),
    _doHTTPRequest(countResults(union, query))
  ]);
  await delay(1000);
	const results = replies.map(result => _analyseRequest(result.url));
	return { optional: results[0], union: results[1] };
}
