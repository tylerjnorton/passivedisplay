window.google_calendar = function () {

	function template (events) {
    var eventStr = events.length > 1 ? 'event' : 'events';
		return `You have <span class="bigword">${events.length}</span> ${eventStr} <span class="bigword">tomorrow</span>.`;
	}

	// Create a logger with identifier
	var log = console.log.bind(console, '[google_calendar] ');

	var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
	var CLIENT_ID = '417882687123-m96t8skgk9ce89tpkkkg6m2guffspur7.apps.googleusercontent.com';

  var ITEM = {
    news: 'Google Cal Events',
    time:  new Date()
  };
  NOTIFICATIONS.push(ITEM);


	gapi.auth.authorize({  client_id: CLIENT_ID,  scope: SCOPES.join(' '),  immediate: true }, function (result) {
		gapi.client.load('calendar', 'v3', function () {
			listUpcomingEvents();
      setInterval(listUpcomingEvents, 1000*60*60);
		});
	});	

	function listUpcomingEvents() {

    var timeMin = new Date();
    timeMin.setHours(0);
    timeMin.setMinutes(0);
    timeMin.setSeconds(0);
    timeMin.setDate(timeMin.getDate() + 1);

    var timeMax = new Date();
    timeMax.setHours(0);
    timeMax.setMinutes(0);
    timeMax.setSeconds(0);
    timeMax.setDate(timeMax.getDate() + 2);

    console.log('TIME MIN', timeMin);
    console.log('TIME MAX', timeMax);

		var request = gapi.client.calendar.events.list({
			'calendarId': 'primary',
      'timeMin': timeMin.toISOString(),
      'timeMax': timeMax.toISOString(),
			'showDeleted': false,
			'singleEvents': true,
			'orderBy': 'startTime'
		});

		request.execute(function(resp) {
      console.log('RESP', resp);

      if (resp.code === 403) {
        ITEM.news = 'GCal ' + resp.code + ' - ' + resp.message;
        ITEM.time = new Date();
        return;
      }

			if (resp.items) {
        ITEM.news = template(resp.items);
        ITEM.time = resp.updated;
			}
		});
	}
};
