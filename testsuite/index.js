const messages = {
	jsonError: 'An error occured trying to decode the specified JSON string. 🙈',
	unknownError: 'Oops. 🙊 Something went wrong while trying to generate the queries.',
	success: 'Queries generated! Wohoo! ✔️'
}

let queryRepresentation = {optimal: '', union: '', optional: ''};
let query = demoQuery;

function parseCode(showMessage = true) {
  let queryCollection;

	document.getElementById('optional-performance').innerText = `Performance test not run yet`;
	document.getElementById('optional-performance').classList.remove('success', 'error', 'pending');
	document.getElementById('union-performance').innerText = `Performance test not run yet`;
	document.getElementById('union-performance').classList.remove('success', 'error', 'pending');

  const selection = document.getElementById('selection-input').value;
	const header = document.getElementById('header-input').value;
	const footer = document.getElementById('footer-input').value;
  //LIMIT = parseInt(document.getElementById('selection-limit').value);
  //HEADERS = document.getElementById('selection-input').value;
  try {
    queryCollection = JSON.parse(document.getElementById('json-input').value);
  } catch(err) {
		document.getElementById('message-box').classList.add('error');
		document.getElementById('message-box').innerText = messages.jsonError;
    console.error('JSON parsing failed', err);
    return;
  }
  query = {selection, queryCollection, header, footer};
	try {
		queryRepresentation.optimal = parseOptimal(query);
		queryRepresentation.union = parseUnion(query);
		queryRepresentation.optional = parseOptional(query);
	} catch(err) {
		document.getElementById('message-box').classList.add('error');
		document.getElementById('message-box').innerText = messages.unknownError;
    console.error('Query generation failed', err);
    return;
	}
	document.getElementById('optimal-query').textContent = wrapQuery(queryRepresentation.optimal, query);
	document.getElementById('union-query').textContent = wrapQuery(queryRepresentation.union, query);
	document.getElementById('optional-query').textContent = wrapQuery(queryRepresentation.optional, query);
	if (showMessage) {
		document.getElementById('message-box').classList.remove('error');
		document.getElementById('message-box').innerText = messages.success;
	}
  Prism.highlightAll(true);
}

async function testQuery() {
	document.getElementById('optional-performance').innerText = `⏳ Query is being executed...`;
	document.getElementById('optional-performance').classList.remove('success', 'error');
	document.getElementById('optional-performance').classList.add('pending');
	document.getElementById('union-performance').innerText = `⏳ Query is being executed...`;
	document.getElementById('union-performance').classList.remove('success', 'error');
	document.getElementById('union-performance').classList.add('pending');

	const testResults = await runTest(queryRepresentation, query);
	document.getElementById('optional-performance').innerText = `🕒 Query answered in ${testResults.optional}ms`;
	document.getElementById('optional-performance').classList.remove('pending', 'error');
	document.getElementById('optional-performance').classList.add('success');
	document.getElementById('union-performance').innerText = `🕒 Query answered in ${testResults.union}ms`;
	document.getElementById('union-performance').classList.remove('pending', 'error');
	document.getElementById('union-performance').classList.add('success');
}

document.getElementById('selection-input').value = demoQuery.selection;
document.getElementById('json-input').value = JSON.stringify(demoQuery.queryCollection, null, '  ');
document.getElementById('header-input').value = demoQuery.header;
document.getElementById('footer-input').value = demoQuery.footer;
parseCode(false);
