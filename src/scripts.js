const sections = document.querySelectorAll("section");
const PLAY_DOPE_SOUND_EFFEX = false;

let NOTIFICATIONS = [];

function refreshNotifications() {
  return fetch("https://jameschandler-passivedisplay.builtwithdark.com/items")
    .then((res) => res.json())
    .then((data) => {
      NOTIFICATIONS = data.map((item) => ({
        ...item,
        lastUpdated: new Date(item.lastUpdated),
        time: new Date(item.time),
      }));
    });
}

let CURRENT_ROTATION_INDEX = 0;
function takeNextItems(theArray, howManyToTake) {
  const results = [];
  while (results.length < howManyToTake && results.length <= theArray.length) {
    if (CURRENT_ROTATION_INDEX > theArray.length - 1) {
      CURRENT_ROTATION_INDEX = 0;
    }
    results.push(theArray[CURRENT_ROTATION_INDEX]);
    CURRENT_ROTATION_INDEX++;
  }
  return results;
}

function flipDemSuckas() {
  const pinnedItems = NOTIFICATIONS.filter((item) => item.pinned);
  const howManyMoreWeNeed = sections.length - pinnedItems.length;
  const dynamicItems = takeNextItems(
    NOTIFICATIONS.filter((item) => !item.pinned),
    howManyMoreWeNeed
  ).sort((a, b) => a.time.getTime() - b.time.getTime());

  for (let i = 0; i < sections.length; i++) {
    setTimeout(function () {
      const activeItem = sections[i].querySelector(".item.active");
      const inactiveItem = sections[i].querySelector(".item:not(.active)");
      const next = pinnedItems[i] || dynamicItems[i - pinnedItems.length];

      if (next && next.pinned) {
        sections[i].classList.add("pinned");
      } else {
        sections[i].classList.remove("pinned");
      }

      inactiveItem.innerHTML = next
        ? `<div class="news">${
            next.news
          }</div> <div class="time"> Last Updated<br />${moment(
            next.lastUpdated
          ).fromNow()}</div>`
        : "";

      // Flip
      if (activeItem.innerHTML !== inactiveItem.innerHTML) {
        inactiveItem.classList.toggle("active");
        activeItem.classList.toggle("active");
      }

      if (PLAY_DOPE_SOUND_EFFEX) {
        document.getElementById("flip" + i).play();
      }
    }, 150 * i);
  }
}

const video = document.createElement("video");
video.setAttribute("loop", "");

function addSourceToVideo(element, type, dataURI) {
  var source = document.createElement("source");
  source.src = "data:video" + type + ";base64," + dataURI;
  source.type = "video/" + type;
  element.appendChild(source);
}

addSourceToVideo(
  video,
  "webm",
  "GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA="
);
addSourceToVideo(
  video,
  "mp4",
  "AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthADAowdbb9/AAAC6W1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAIAAAACAAAAAABsW1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAAA+gAAAAAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVxtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAALhzdHNkAAAAAAAAAAEAAACobXA0dgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAIAAgASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAFJlc2RzAAAAAANEAAEABDwgEQAAAAADDUAAAAAABS0AAAGwAQAAAbWJEwAAAQAAAAEgAMSNiB9FAEQBFGMAAAGyTGF2YzUyLjg3LjQGAQIAAAAYc3R0cwAAAAAAAAABAAAAAQAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGB1ZHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABMYXZmNTIuNzguMw=="
);

const ONE_MINUTE = 1000 /* milliseconds */ * 60; /* seconds */

setInterval(refreshNotifications, ONE_MINUTE * 2);
setInterval(flipDemSuckas, ONE_MINUTE * 0.5);

// fetch data on load and immediately flip
refreshNotifications().then(() => {
  flipDemSuckas();

  // chrome sometimes prevents this because the user didn't interact with the page before its called...
  // Maybe on first load we can make the user click something..
  video.play();
});
