var amScrolling = false;
var items = document.querySelectorAll('.item:not(.active)');
var itemsA = document.querySelectorAll('.item.active');

setInterval(function () {
	for (let i = 0 ; i < items.length; i++) {
		setTimeout( function () {

			itemsA[i].classList.toggle('active');
			items[i].classList.toggle('active');
			document.getElementById("flip"+i).play();
		}, 150*i);
	}

}, 5000);


var stuffToShow = [
	{ news:"Your app has updated", time:"2 days ago" },
	{ news:"Your app has updated", time:"3 days ago" },
	{ news:"Your app has updated", time:"4 days ago" },
	{ news:"Your app has updated", time:"5 days ago" },
	{ news:"Your app has updated", time:"6 days ago" },
	{ news:"Your app has updated", time:"7 days ago" },
	{ news:"Your app has updated", time:"8 days ago" },
	{ news:"Your app has updated", time:"9 days ago" },
	{ news:"Your app has updated", time:"10 days ago" },
	{ news:"Your app has updated", time:"11 days ago" },
	{ news:"Your app has updated", time:"12 days ago" },
	{ news:"Your app has updated", time:"13 days ago" }
];

var msg = `${stuffToShow[0].news} <span class="time"> ${stuffToShow[0].time}</span>`;
var int;
for (int = 0; int < items.length; int++) {
    itemsA[int].innerHTML = msg;
    items[int].innerHTML = msg;
};