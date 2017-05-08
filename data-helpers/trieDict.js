function Trie() {
	this.dict = {}
	this.rootNode = {}
}

Trie.prototype.checkAndAdd = function(place) {

	if (!place) {
		return;
	}

	let currentNode = this.rootNode;
	let placeWords = place.split(' ');
	let isNewWord = false;

	if (this.dict.hasOwnProperty(place)) {
		this.dict[place]++;
	} else {
		this.dict[place] = 1;
	}

	function checkAndAddFragment(fragment) {
		for (let j = 0; j < fragment.length; j++) {
			let char = fragment[j];
			if (!currentNode.hasOwnProperty(char)) {
				isNewWord = true;
				currentNode[char] = {};
				currentNode[char]['places'] = [place];
			} else {
				if (currentNode[char]['places'].indexOf(place) === -1) {
					currentNode[char]['places'].push(place);
				}
			}
			currentNode = currentNode[char]
		}		
		if (!currentNode.hasOwnProperty('end')) {
			isNewWord = true;
			currentNode['end'] = {};
		}
	}

	for (let i = 0; i < placeWords.length; i++) {
		checkAndAddFragment(placeWords[i]);
		currentNode = this.rootNode;
	}
	return isNewWord;
}

Trie.prototype.getCount = function(arr) {
	if (!arr) {
		return false;
	}
	let results = [];
	for (let i = 0; i < arr.length; i++) {
		results.push([arr[i], this.dict[arr[i]]]);
	}
	results.sort(function(a,b) {
		return b[1] - a[1];
	})
	return results;
}

Trie.prototype.search = function(str) {
	let currentNode = this.rootNode;
	for (let i = 0; i < str.length; i++) {
		if (!currentNode[str[i]]) {
			return false;
		}
		currentNode = currentNode[str[i]];
	}
	return currentNode['places'];
}

Trie.prototype.searchResults = function(str) {
	return this.getCount(this.search(str));
}

module.exports = Trie;
