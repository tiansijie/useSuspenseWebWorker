let count = 1;
onmessage = function(e) {
	this.self.setTimeout(() => {
		postMessage({ clicked: count++ });
	}, 1000);
};
