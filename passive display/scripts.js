var amScrolling = false;
var i = 0;
var x = document.getElementById("flip"); 
var items = document.querySelectorAll('.item');

setInterval(function () {
	var next = i + 1;
	if (i + 1 >= items.length) next = 0;
	items[i].classList.toggle('active');
	items[next].classList.toggle('active');
	x.play();

	i = i + 1;

	if (i >= items.length) i = 0;

}, 3000);