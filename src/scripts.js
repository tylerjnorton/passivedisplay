var amScrolling = false;
var items = document.querySelectorAll('.item:not(.active)');
var itemsA = document.querySelectorAll('.item.active');
var currentTopIndex = 0;
var SOUND = true;

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
	{ news:"Your kowala has updated", time:"11 days ago" }
];

function getNextBatchOfStuff() {
	var nextBatch = NOTIFICATIONS.slice(currentTopIndex, currentTopIndex + items.length);
	currentTopIndex += items.length;

	if (nextBatch.length < items.length) {
		var extras = NOTIFICATIONS.slice(0, items.length - nextBatch.length);
		nextBatch = nextBatch.concat(extras);
		currentTopIndex = extras.length;
	}

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
			if(SOUND) document.getElementById("flip"+i).play();
		}, 150*i);
	}

}, 5000);


var initialStuff = getNextBatchOfStuff();
for (var int = 0; int < items.length; int++) {
	var msg = `${initialStuff[int].news} <span class="time"> ${initialStuff[int].time}</span>`;
    itemsA[int].innerHTML = msg;
};

function fetchCurrentLocationWeather () {
	fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6f45d2aee41c360800b53ed8ca16549d`)
	.then(res => res.json())
	.then(function (res) {
		console.log('RES', res);
		res.weather.forEach(function (item) {
			NOTIFICATIONS.pop();
			NOTIFICATIONS.unshift({ news: item.description, time: moment(new Date(res.dt * 1000)).fromNow()})	
		})
	})
	.catch(function (error) {
		console.log('ERROR', error);
	});
}


navigator.geolocation.getCurrentPosition(function (location) {
	console.log(location);
	window.lat = location.coords.latitude;
	window.long = location.coords.longitude;

	fetchCurrentLocationWeather();
	setInterval(fetchCurrentLocationWeather, 1000*60*5);
}, function (err) {
	console.log('ERROR GETTING LOCATION', err, err.stack);
});
