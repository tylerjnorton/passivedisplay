var amScrolling = false;
var items = document.querySelectorAll('.item:not(.active)');
var itemsA = document.querySelectorAll('.item.active');
var currentTopIndex = 0;
var SOUND = true;

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

			var msg = `<div class="news">${next.news}</div> <div class="time"> Last Updated<br />${moment(next.time).fromNow()}</div>`;
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
setInterval(showThemSuckas, 1000*20);

// Run it now at startup
showThemSuckas();

setInterval(async () => {
	NOTIFICATIONS = await fetch('https://adamcoll-passive-display.builtwithdark.com/items').then(res => res.json());	
}, 1000*20);
