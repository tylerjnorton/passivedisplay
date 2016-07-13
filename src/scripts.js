var amScrolling = false;
var items = document.querySelectorAll('.item:not(.active)');
var itemsA = document.querySelectorAll('.item.active');
var currentTopIndex = 0;
var SOUND = false;

var NOTIFICATIONS = [];

function getNextItem() {
	// To prevent infinite loop, if the array is empty just return null
	if (NOTIFICATIONS.length < 1) return null;

	// if the current top index is higher than the number of items in the list then reset to 0 and try again.
	if (currentTopIndex >= NOTIFICATIONS.length) {
		currentTopIndex = 0;
		return getNextItem();
	}

	// we aren't too high so get this index, then increment it
	const next = NOTIFICATIONS[currentTopIndex];
	currentTopIndex++;
	return next;
}

function showThemSuckas () {

	for (let i = 0 ; i < items.length; i++) {
		setTimeout( function () {

			var next = getNextItem();
			if (!next) return;

			var msg = `<span class="news">${next.news}</span> <span class="time"> ${moment(next.time).fromNow()}</span>`;
			if(items[i].classList.contains('active'))
				itemsA[i].innerHTML = msg;
			else
				items[i].innerHTML = msg;

			itemsA[i].classList.toggle('active');
			items[i].classList.toggle('active');
			if(SOUND) document.getElementById("flip"+i).play();
		}, 150*i);
	}
}

// Run extra 5 seconds
setInterval(showThemSuckas, 5000);

// Run it now at startup
showThemSuckas();