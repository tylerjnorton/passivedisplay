window.google_calendar = function () {

	function template (events) {
		return `You have <span class="bigword">${events.length}</span> events <span class="bigword">tomorrow</span>.`;
	}

	// Create a logger with identifier
	var log = console.log.bind(console, '[google_calendar] ');

	var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
	var CLIENT_ID = '417882687123-m96t8skgk9ce89tpkkkg6m2guffspur7.apps.googleusercontent.com';


	gapi.auth.authorize({  client_id: CLIENT_ID,  scope: SCOPES.join(' '),  immediate: true }, function (result) {
		gapi.client.load('calendar', 'v3', function () {
			setInterval(listUpcomingEvents, 1000*60);
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
			var events = resp.items;
			if (events && events.length) {
        NOTIFICATIONS.unshift({ news: template(events), time: moment(resp.updated).fromNow() });
			}
		});
	}
};

/* EXAMPLE EVENT
 {
   "kind": "calendar#event",
   "etag": "\"2935813192104000\"",
   "id": "5ncu021voa1lbs1cv92fdgqdh8_20160714T150000Z",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=NW5jdTAyMXZvYTFsYnMxY3Y5MmZkZ3FkaDhfMjAxNjA3MTRUMTUwMDAwWiBhZGFtQG1pdHJlbmQuY29t",
   "created": "2013-12-12T19:22:06.000Z",
   "updated": "2016-07-07T15:49:56.052Z",
   "summary": "Dev Ed Meeting",
   "description": "A meeting where anyone can volunteer to present something. Something work related (technical, profesional, etc), It can be something you know really well, something you recently learned, or maybe a new technology that we don't use but might be useful. \n\nWe can try to stick to half an hour. 20 minutes of presenting and 10 minutes of questions at the end.\n\nI can present the first one to use as an example. Hopefully everyone will get a chance to present something eventually.  I will be asking for volunteers for other meetings afterwards. \n\nWe will set up a Google hangout or something so Rado can join too.\n\n~Corey ",
   "location": "Meeting room",
   "creator": {
    "email": "corey@mitrend.com",
    "displayName": "Corey Shields"
   },
   "organizer": {
    "email": "corey@mitrend.com",
    "displayName": "Corey Shields"
   },
   "start": {
    "dateTime": "2016-07-14T11:00:00-04:00"
   },
   "end": {
    "dateTime": "2016-07-14T11:30:00-04:00"
   },
   "recurringEventId": "5ncu021voa1lbs1cv92fdgqdh8_R20150528T150000",
   "originalStartTime": {
    "dateTime": "2016-07-14T11:00:00-04:00"
   },
   "visibility": "public",
   "iCalUID": "5ncu021voa1lbs1cv92fdgqdh8_R20150528T150000@google.com",
   "sequence": 4,
   "attendees": [
    {
     "email": "mitrend@mitrend.com",
     "displayName": "miTrend",
     "responseStatus": "needsAction"
    },
    {
     "email": "adam@mitrend.com",
     "displayName": "Adam Coll",
     "self": true,
     "responseStatus": "accepted"
    },
    {
     "email": "corey@mitrend.com",
     "displayName": "Corey Shields",
     "organizer": true,
     "responseStatus": "accepted"
    }
   ],
   "reminders": {
    "useDefault": true
   }
  }
  */