window.fake = function () {

   var iteration = 1;
   var items = [
      { news: 'THING', time: new Date() },
      { news: 'THING', time: new Date() },
      { news: 'THING', time: new Date() },
      { news: 'THING', time: new Date() },
      { news: 'THING', time: new Date() },
      { news: 'THING', time: new Date() },
      { news: 'THING', time: new Date() },
      { news: 'THING', time: new Date() },
      { news: 'THING', time: new Date() },
   ];

   items.forEach(function (item) { NOTIFICATIONS.push(item); });

   function makeStuffUp() {
      console.log('[fake] Making stuff up');
      for(var i = 0; i < items.length; i++) {
         items[i].news = 'THING-' + i*iteration;
         items[i].time = new Date((new Date()).getTime() + i*iteration*1000000);
      }
      iteration++;
   }

   setInterval(makeStuffUp, 12000);

};