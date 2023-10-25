/* eslint-disable no-undef */
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29rYXZuMTEiLCJhIjoiY2xuenJ6Nm02MHZvajJpcGVreXpmZm8wNCJ9.a3zQ4KrnD9YRRco8l4o-Pg'


var mapboxScript = document.createElement('script');
mapboxScript.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js');
document.head.appendChild(mapboxScript);

mapboxScript.onload = function () {
  mapboxgl.accessToken = MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [106.695249, 10.777009],
    zoom: 12,
    hash: true,
    locale: 'vi-VN',
    language: 'vi-VN',
    cooperativeGestures: true,
  });
  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();

  const geolocation = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showAccuracyCircle: true,
    showUserLocation: true
  });
  map.addControl(geolocation, 'bottom-right');
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');


  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: 'vn',
    language: 'vi-VN',
    localIdeographFontFamily: "'Montserrat', 'sans-serif'",
  });
  map.addControl(
    geocoder,
    'top-left'
  );

  // Wait until the map has finished loading.
  map.on('load', () => {
    // Add a custom vector tileset source. This tileset contains
    // point features representing museums. Each feature contains
    // three properties. For example:
    // {
    //     alt_name: "Museo Arqueologico",
    //     name: "Museo Inka",
    //     tourism: "museum"
    // }
    map.addSource('museums', {
      type: 'vector',
      url: 'mapbox://mapbox.2opop9hr'
    });
    map.addLayer({
      'id': 'museums',
      'type': 'circle',
      'source': 'museums',
      'layout': {
        // Make the layer visible by default.
        'visibility': 'none'
      },
      'paint': {
        'circle-radius': 8,
        'circle-color': 'rgba(55,148,179,1)'
      },
      'source-layer': 'museum-cusco'
    });

    // Add the Mapbox Terrain v2 vector tileset. Read more about
    // the structure of data in this tileset in the documentation:
    // https://docs.mapbox.com/vector-tiles/reference/mapbox-terrain-v2/
    map.addSource('contours', {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2'
    });
    map.addLayer({
      'id': 'contours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'contour',
      'layout': {
        // Make the layer visible by default.
        'visibility': 'none',
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#877b59',
        'line-width': 1
      }
    });
  });

  // After the last frame rendered before the map enters an "idle" state.
  map.on('idle', () => {
    // If these two layers were not added to the map, abort
    if (!map.getLayer('contours') || !map.getLayer('museums')) {
      return;
    }

    const baocaoToggle = document.getElementById('bao-cao');
    const quangcaoToggle = document.getElementById('quang-cao');
    baocaoToggle.addEventListener('click', () => {
      const clickedLayer = 'contours';
      const visibility = map.getLayoutProperty(
        clickedLayer,
        'visibility'
      );
      if (baocaoToggle.checked == true) {
        console.log('Hiện báo cáo');
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      } else {
        console.log('Ẩn báo cáo');
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      }
    });

    quangcaoToggle.addEventListener('click', () => {
      if (quangcaoToggle.checked == true) {
        console.log('Hiện quảng cáo');
      } else {
        console.log('Ẩn quảng cáo');
      }
    }
    );
  });
}
