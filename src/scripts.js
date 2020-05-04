var amScrolling = false;
var items = document.querySelectorAll('.item:not(.active)');
var itemsA = document.querySelectorAll('.item.active');
var SOUND = false;

var NOTIFICATIONS = [];

function refreshNotifications() {
	return fetch('https://adamcoll-passive-display.builtwithdark.com/items').then(res => res.json()).then(data => { NOTIFICATIONS = data; });
}

var currentIndex = 0;
function takeNextItems(theArray, howManyToTake) {
	const results = [];
	while (results.length < howManyToTake && results.length <= theArray.length) {
		if (currentIndex > theArray.length - 1) {
			currentIndex = 0;
		}
		results.push(theArray[currentIndex]);
		currentIndex++;
	}
	return results
}

function showThemSuckas () {

	const pinnedItems = NOTIFICATIONS.filter(item => item.pinned);
	const howManyMoreWeNeed = items.length - pinnedItems.length;
	const dynamicItems = takeNextItems(NOTIFICATIONS.filter(item => !item.pinned), howManyMoreWeNeed);

	for (let i = 0 ; i < items.length; i++) {
		setTimeout( function () {


			const next = pinnedItems[i] || dynamicItems[i - pinnedItems.length];

			var msg = next ? `<div class="news">${next.news}</div> <div class="time"> Last Updated<br />${moment(next.time).fromNow()}</div>` : '';
			if(items[i].classList.contains('active'))
				itemsA[i].innerHTML = msg;
			else
				items[i].innerHTML = msg;

			itemsA[i].classList.toggle('active');
			items[i].classList.toggle('active');

			if (SOUND) {
				document.getElementById("flip"+i).play();
			}
		}, 150*i);
	}
}
var Util={};
Util.base64 = function(mimeType, base64) {
  return 'data:' + mimeType + ';base64,' + base64;
};

var video = document.createElement('video');
  video.setAttribute('loop', '');

  function addSourceToVideo(element, type, dataURI) {
    var source = document.createElement('source');
    source.src = dataURI;
    source.type = 'video/' + type;
    element.appendChild(source);
  }

  addSourceToVideo(video,'webm', Util.base64('video/webm', 'GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA='));
  addSourceToVideo(video, 'mp4', Util.base64('video/mp4', 'AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthADAowdbb9/AAAC6W1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAIAAAACAAAAAABsW1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAAA+gAAAAAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVxtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAALhzdHNkAAAAAAAAAAEAAACobXA0dgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAIAAgASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAFJlc2RzAAAAAANEAAEABDwgEQAAAAADDUAAAAAABS0AAAGwAQAAAbWJEwAAAQAAAAEgAMSNiB9FAEQBFGMAAAGyTGF2YzUyLjg3LjQGAQIAAAAYc3R0cwAAAAAAAAABAAAAAQAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGB1ZHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABMYXZmNTIuNzguMw=='));

video.play();

// Run extra 5 seconds
setInterval(showThemSuckas, 5000);
setInterval(refreshNotifications, 5000);
refreshNotifications().then(() => showThemSuckas());