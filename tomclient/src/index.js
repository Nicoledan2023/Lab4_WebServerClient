import "./css/styles.css";

import tt from "@tomtom-international/web-sdk-maps";
import toxicStyle from "./js/toxic.js";
// import ipLocaton from "./js/ipLocaton";
// import jslocation from "./js/jslocation";
// import jsWatchlocation from "./js/jsWatchlocation";
import sportlocatioin from "./js/sportlocatioin";

import templateRoot from "./hbs/root.hbs";
import templateMap from "./hbs/map.hbs";

// use root template, apply to "app" div
let appEl = document.getElementById("app");
let mainEl;
appEl.innerHTML = templateRoot({ siteInfo: { title: "Map" } });

window.onload = () => {
  mainEl = document.getElementById("main");
  mainEl.innerHTML = templateMap();

  sportlocatioin().then((json) => {
    initMap(json);
  });
};

let map;
// 45.455313 -75.737609

let initMap = (data) => {
  console.log(data);
  tt.setProductInfo("test-demo", "0.0.1");
  map = tt.map({
    key: "NNnVPoPM9wVe2TNRA93zMuE6cKBdP2M0",
    container: "map",
    style: toxicStyle,
    center: [-75.70552827283976, 45.34257070923472],
    zoom: 10,
    pitch: 10,
  });

  sportlocatioin().then((data) => {
    data.forEach((ele) => {
      let marker = new tt.Marker().setLngLat([ele.lng, ele.lat]).addTo(map);

      let popup = new tt.Popup({ offset: [10, -20] }).setHTML(
        `<h3>${ele.name}</h3><p>${ele.address}</p>`
      );
      marker.setPopup(popup);

      marker.getElement().addEventListener("click", function (e) {
        map.easeTo({
          center: marker.getLngLat(),
          zoom: 14,
          pitch: 45,
          bearing: 45,
          duration: 2000,
        });
        marker.getPopup().addTo(map);
        e.stopPropagation();
      });
    });
  });

  // var popup = new tt.Popup({ className: "popup" })
  //   .setHTML("<h1>Hello I'm a Popup!</h1>")
  //   .addTo(map);
  // jslocation((pos) => {
  //   let jsMarker = new tt.Marker()
  //     .setLngLat([pos.longitude, pos.latitude])
  //     .addTo(map);
  // });

  // let marker = new tt.Marker()
  //   .setLngLat([location.lng, location.lat])
  //   .addTo(map);
  // marker.getElement().addEventListener("click", function (e) {
  //   map.easeTo({
  //     center: marker.getLngLat(),
  //     zoom: 14,
  //     pitch: 45,
  //     bearing: 45,
  //     duration: 2000,
  //   });
  //   e.stopPropagation();
  // });

  // marker.setPopup(popup);

  // marker.getElement().addEventListener('click', function (e) {
  //   map.easeTo({ center: marker.getLngLat(), zoom: 14, duration: 1500 })

  // });
};
