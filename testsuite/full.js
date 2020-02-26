const demoQuery = {
	select: '?car ?manufacturer ?country ?color',
	where: {
		type: 'OPTIMAL',
		left: [{ query: '?car a :car' }],
		right: [
			{
				type: 'THEN',
				left: [{ query: '?car :made_by ?manufacturer' }],
				right: [{ query: '?manufacturer :based_in ?country' }]
			},
			{ query: ' ?car :color ?color' }
		]
	}
}

function parseOptimal(queryObj) {
	const query = _parseOptimalLoop(queryObj.where);
	return `SELECT ${queryObj.select} WHERE { ${query} }`;
}

function _parseOptimalLoop(queryObj) {
	if (typeof queryObj.query === 'string') {
		return queryObj.query;
	} else {
		let retQuery = '';
		if (queryObj.left.length === 1) {
			retQuery += _parseOptimalLoop(queryObj.left[0]);
		} else {
			const brackets = queryObj.type === 'OPTIMAL' ? ['{', '}'] : ['(', ')'];
			const separator = queryObj.type === 'OPTIMAL' ? ' .' : ',';
			retQuery += brackets[0] + ' ';
			for(let requirement of queryObj.left) {
				retQuery += _parseOptimalLoop(requirement) + separator;
			}
			retQuery += ' ' + brackets[1];
		}

		retQuery += ' ' + queryObj.type + ' ';

		if (queryObj.right.length === 1) {
			retQuery += _parseOptimalLoop(queryObj.right[0]);
		} else {
			retQuery += '( ';
			for(let [i, preference] of queryObj.right.entries()) {
				console.log(i, preference);
				retQuery += _parseOptimalLoop(preference);
				if(i !== queryObj.right.length - 1) {
					retQuery += ',';
				}
			}
			retQuery += ' )';
		}
		console.log(queryObj, retQuery);
		return retQuery;
	}
}

function parseUnion(queryObj) {
	let retQuery = `SELECT ${queryObj.select} WHERE { `;
	if (queryObj.where.query) {
		retQuery += queryObj.where.query;
	} else {
		let possibleStructures = [];
		let requirements = [];

		for (let requirement of queryObj.where.left) {
			if(requirement.query) {
				requirements.push(requirement.query);
			} else if(requirement.type === 'OPTIMAL') {
				requirements.push('{ ' + parseUnion({select: queryObj.select, where: requirement}) + ' } ');
			}
		}
		console.log(requirements);
		retQuery += `{ ${requirements.join(' . ')} } `;


	}
	retQuery += ' }';
	return retQuery;
}

function _getPreferenceCombinations(preferenceList) {
	const combinations = [];
	const combine = function(selected, available) {
		for (let [i, preference] of available.entries()) {
			let positiveSelection = combine([...selected, preference], available.slice(0, i+1));
			let negativeSelection = combine([...selected], available.slice(0, i+1));
		}
	}
}

console.log(parseOptimal(demoQuery));
console.log(parseUnion(demoQuery));
