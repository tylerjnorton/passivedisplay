window.fbAsyncInit = function() {

  var template = function (events) {
    return `You have ${events.length} Facebook events coming up.`;
  };

  var log = console.log.bind(console, '[facebook] ');

  var ITEM = {
    news: 'Facebook Events',
    time:  new Date()
  };
  NOTIFICATIONS.push(ITEM);

  FB.init({ appId: '1105264709545076', xfbml: true, version: 'v2.7' });

  FB.getLoginStatus(function (res) {
    FB.api('/me/events?since=now', 'GET', {}, function(response) {
      log('FB DATA', response);
      ITEM.news = template(response.data);
      ITEM.time = new Date();
    });
  });

};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));