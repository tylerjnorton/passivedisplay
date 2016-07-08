var amScrolling = false;
var items = document.querySelectorAll('.item:not(.active)');
var itemsA = document.querySelectorAll('.item.active');
var currentTopIndex = 0;

var NOTIFICATIONS = [
	{ news:"Your apple has updated", time:"1 days ago" },
	{ news:"Your banana has updated", time:"2 days ago" },
	{ news:"Your carrot has updated", time:"3 days ago" },
	{ news:"Your dumpling has updated", time:"4 days ago" },
	{ news:"Your egret has updated", time:"5 days ago" },
	{ news:"Your ferret has updated", time:"6 days ago" },
	{ news:"Your grapes have updated", time:"7 days ago" },
	{ news:"Your hippo has updated", time:"8 days ago" },
	{ news:"Your indie band has updated", time:"9 days ago" },
	{ news:"Your juice has updated", time:"10 days ago" },
	{ news:"Your kowala has updated", time:"11 days ago" },
	{ news:"Your lemon tree has updated", time:"12 days ago" },
	{ news:"Your minecraft has updated", time:"13 days ago" },
	{ news:"Your norton antivirus have updated", time:"14 days ago" },
	{ news:"Your octopus has updated", time:"15 days ago" },
	{ news:"Your puddle of mudd band has updated", time:"16 days ago" },
	{ news:"Your queen album has updated", time:"17 days ago" },
	{ news:"Your reddit thread has updated", time:"18 days ago" },
	{ news:"Your stapler tree has updated", time:"19 days ago" },
	{ news:"Your tractor has updated", time:"20 days ago" },
	{ news:"Your underpants band has updated", time:"21 days ago" },
	{ news:"Your viagra has updated", time:"22 days ago" },
	{ news:"Your wiggle room has updated", time:"23 days ago" },
	{ news:"Your x-ray vision has updated", time:"24 days ago" },
	{ news:"Your yoyo vision has updated", time:"25 days ago" },
	{ news:"Your zebra tree has updated", time:"26 days ago" }
];

function getNextBatchOfStuff() {
	console.log('GETTING', currentTopIndex, currentTopIndex + items.length);
	var nextBatch = NOTIFICATIONS.slice(currentTopIndex, currentTopIndex + items.length);
	currentTopIndex += items.length;

	if (nextBatch.length < items.length) {
		console.log('NEED EXTRAS', nextBatch.length, items.length);
		var extras = NOTIFICATIONS.slice(0, items.length - nextBatch.length);
		console.log('EXTRAS', extras);
		nextBatch = nextBatch.concat(extras);
		currentTopIndex = items.length - nextBatch.length;
	}

	console.log('NEXT BATCH', nextBatch.length, nextBatch);

	return nextBatch;
}

setInterval(function () {
	var stuffToShow = getNextBatchOfStuff();
	console.log('SHOWING', stuffToShow);

	for (let i = 0 ; i < items.length; i++) {
		setTimeout( function () {

			var msg = `${stuffToShow[i].news} <span class="time"> ${stuffToShow[i].time}</span>`;
			if(items[i].classList.contains('active'))
				itemsA[i].innerHTML = msg;
			else
				items[i].innerHTML = msg;

			itemsA[i].classList.toggle('active');
			items[i].classList.toggle('active');
			document.getElementById("flip"+i).play();
		}, 150*i);
	}

}, 5000);


var initialStuff = getNextBatchOfStuff();
for (var int = 0; int < items.length; int++) {
	var msg = `${initialStuff[int].news} <span class="time"> ${initialStuff[int].time}</span>`;
    itemsA[int].innerHTML = msg;
};

