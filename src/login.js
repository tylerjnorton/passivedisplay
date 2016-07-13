function googleLogin () {
	var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
	var CLIENT_ID = '417882687123-m96t8skgk9ce89tpkkkg6m2guffspur7.apps.googleusercontent.com';
	gapi.auth.authorize({ 
		client_id: CLIENT_ID, 
		scope: SCOPES.join(' '), 
		immediate: false 
	}, function (result) {
		console.log('AUTH RESULT', result);
	});
}