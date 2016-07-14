window.google_calendar = function () {

	function template (events) {
		return `You have <span class="bigword">${events.length}</span> events <span class="bigword">tomorrow</span>.`;
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
		});
	});	

	function listUpcomingEvents() {
		var request = gapi.client.calendar.events.list({
			'calendarId': 'primary',
      // 'timeMin': (new Date()).toISOString(), Make this tomorrow at 0:00
      // 'timeMax': (new Date()).toISOString(), Make this tomorrow at 23:59
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

			var events = resp.items;
			if (events && events.length) {
        ITEM.news = template(events);
        ITEM.time = resp.updated;
			}
		});
	}
};
