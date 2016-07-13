window.weather = function () {

	function template (item, res) {
		return `It is <span class="bigword">${Math.round(res.main.temp)}°F and ${item.main}</span> outside`;
	}

	// Create a logger with identifier
	var log = console.log.bind(console, '[weather] ');


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
		window.lat = location.coords.latitude;
		window.long = location.coords.longitude;

		fetchCurrentLocationWeather();
		setInterval(fetchCurrentLocationWeather, 1000*60*5);
	}, function (err) {
		log('ERROR GETTING LOCATION', err, err.stack);
	});


};

/* Example
{  
   "coord":{  
      "lon":-71.55,
      "lat":42.35
   },
   "weather":[  
      {  
         "id":801,
         "main":"Clouds",
         "description":"few clouds",
         "icon":"02d"
      }
   ],
   "base":"stations",
   "main":{  
      "temp":86.88,
      "pressure":993.6,
      "humidity":56,
      "temp_min":81,
      "temp_max":92.12
   },
   "wind":{  
      "speed":5.84,
      "deg":217.501
   },
   "rain":{  
      "3h":0.0875
   },
   "clouds":{  
      "all":12
   },
   "dt":1468432251,
   "sys":{  
      "type":3,
      "id":1466189885,
      "message":0.0415,
      "country":"US",
      "sunrise":1468401729,
      "sunset":1468455698
   },
   "id":4943170,
   "name":"Marlborough",
   "cod":200
}
*/