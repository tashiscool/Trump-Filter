// filter.js

(function() {
	// Variables
	const regex = /Trump/i;
	const search = regex.exec(document.body.innerText);

	const selector = ":contains('Trump'), :contains('TRUMP'), :contains('trump')";

	// Functions
	function filterMild() {
		console.log("Filtering Trump with Mild filter...");
		return $(selector).filter("h1,h2,h3,h4,h5,p,span,li");
	}

	function filterDefault() {
		console.log("Filtering Trump with Default filter...");
		return $(selector).filter(":only-child").closest('div');
	}

	function filterVindictive() {
		console.log("Filtering Trump with Vindictive filter...");
		return $(selector).filter(":not('body'):not('html')");
	}

	function getElements(filter) {
		if (filter === "mild") {
			return filterMild();
		} else if (filter === "vindictive") {
			return filterVindictive();
		} else if (filter === "aggro") {
			return filterDefault();
		} else {
			return filterMild();
		}
	}

	function filterElements(elements) {
		console.log("Elements to filter: ", elements);
		elements.fadeOut("fast");
	}

	// Implementation
	if (search) {
		console.log("Donald Trump found on page! - Searching for elements...");
		chrome.storage.sync.get({ filter: 'mild' }, (items) => {
			console.log("Filter setting stored is: " + items.filter);
			const elements = getElements(items.filter);
			filterElements(elements);
			chrome.runtime.sendMessage({ method: "saveStats", trumps: elements.length }, (response) => {
				console.log("Logging " + elements.length + " trumps.");
			});
		});
		chrome.runtime.sendMessage({}, (response) => {});
	}
})();
