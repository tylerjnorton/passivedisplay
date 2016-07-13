window.weather = function () {

	function template (item, res) {
		return `
		<span class="icon"><img src="http://openweathermap.org/img/w/${item.icon}.png" /></span>
		 It is 
		 <span class="bigword">${Math.round(res.main.temp)}°F and ${item.main}</span>
		  outside
		  `;
	}

	// Create a logger with identifier
	var log = console.log.bind(console, '[google_calendar] ');


	function fetchCurrentLocationWeather () {
		fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=6f45d2aee41c360800b53ed8ca16549d`)
		.then(res => res.json())
		.then(function (res) {
			log('Weather response', res);
			res.weather.forEach(function (item) {
				NOTIFICATIONS.pop();
				NOTIFICATIONS.unshift({ news: template(item, res), time: moment(new Date(res.dt * 1000)).fromNow()});
			})
		})
		.catch(function (error) {
			log('ERROR', error);
		});
	}


	navigator.geolocation.getCurrentPosition(function (location) {
		console.log(location);
		window.lat = location.coords.latitude;
		window.long = location.coords.longitude;

		fetchCurrentLocationWeather();
		setInterval(fetchCurrentLocationWeather, 1000*60*5);
	}, function (err) {
		log('ERROR GETTING LOCATION', err, err.stack);
	});


};