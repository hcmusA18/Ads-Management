/* eslint-disable no-undef */
import request from './request.js';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29rYXZuMTEiLCJhIjoiY2xuenJ6Nm02MHZvajJpcGVreXpmZm8wNCJ9.a3zQ4KrnD9YRRco8l4o-Pg';

const mapboxVersion = 'v2.9.1';
const mapboxScript = document.createElement('script');
mapboxScript.setAttribute('src', `https://api.mapbox.com/mapbox-gl-js/${mapboxVersion}/mapbox-gl.js`);
document.head.appendChild(mapboxScript);

const COLORS = {
  yellow: '#C7BA30',
  red: '#FF3C3C',
  blue: '#3C77FF',
}

function generateSpotHTML(spot) {
  return `<div class="card">
            <img src="${spot.spotImage[0]}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
              <h6 class="card-title fw-bold">${spot.spotName}</h6>
              <p class="card-text">${spot.spotTypeName}</p>
              <p class="card-text">${spot.address}</p>
              <p class="card-text fw-bold fst-italic text-uppercase">${spot.planned}</p>
            </div>
          </div>`;
}

async function getSpotsData() {
  try {
    const spots = await request.getAllSpots();
    const spotsGeojson = {
      type: 'FeatureCollection',
      features: [],
    };

    Object.values(spots).forEach((spot) => {
      spotsGeojson.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [spot.longitude, spot.latitude],
        },
        properties: {
          ...spot,
          description: generateSpotHTML(spot),
        },
      });
    });

    return spotsGeojson;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get spots data');
  }
}

function createMap() {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', // stylesheet location
    center: [106.695249, 10.777009],
    zoom: 12,
    hash: true,
    locale: 'vi-VN',
    language: 'vi-VN',
  });
  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();

  const geolocation = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showAccuracyCircle: true,
    showUserLocation: true,
  });
  map.addControl(geolocation,'bottom-right');
  map.addControl(new mapboxgl.NavigationControl(),'bottom-right');
  map.addControl(new mapboxgl.FullscreenControl(),'bottom-right');
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
    placeholder: 'Tìm kiếm địa điểm',
    language: 'vi-VN',
    countries: 'vn',
  }));

  return map;
}

async function addSpotLayer(map, spotsGeojson) {
  map.addSource('spots', {
    'type': 'geojson',
    'data': spotsGeojson,
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    clusterProperties: {
      hasReport: ['any', ['get', 'hasReport']],
      planned: ['any', ['==', ['get', 'planned'], "Đã quy hoạch"]],
    }
  });

  // convert circleColor to rgb
  // const rgbColor = hexToRgb(circleColor);

  map.addLayer({
    'id': 'cluster-spots',
    'type': 'circle',
    'source': 'spots',
    'filter': ['has', 'point_count'],
    'paint': {
      'circle-color': [
        'case',
        ['==', ['get', 'hasReport'], true],
        COLORS.red,
        ['==', ['get', 'planned'], "Đã quy hoạch"],
        COLORS.yellow,
        COLORS.blue
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        5,
        30,
        7,
        40
      ]
    }
  });

  map.addLayer({
    id: 'cluster-count-spots',
    type: 'symbol',
    source: 'spots',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': [
        'Montserrat SemiBold',
        'Arial Unicode MS Bold'
      ],
      'text-size': 12
    }
  });

  map.addLayer({
    'id': 'unclustered-point-spots',
    'type': 'circle',
    'source': 'spots',
    'filter': ['!', ['has', 'point_count']],
    'paint': {
      'circle-color': [
        'case',
        ['==', ['get', 'hasReport'], true],
        COLORS.red,
        ['==', ['get', 'hasAds'], true],
        COLORS.blue,
        ['==', ['get', 'planned'], "Đã quy hoạch"],
        COLORS.yellow,
        COLORS.blue
      ],
      'circle-radius': 12,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    },
  });

  map.addLayer({
    'id': 'unclustered-point-label-spots',
    'type': 'symbol',
    'source': 'spots',
    'filter': [
      'all',
      ['!', ['has', 'point_count']],
      ['==', ['get', 'hasAds'], true],
    ],
    'layout': {
      'text-field': 'QC',
      'text-font': [
        'Montserrat SemiBold',
        'Arial Unicode MS Bold'
      ],
      'text-size': 8,
    },
    'paint': {
      'text-color': 'white',
    },
  });

  map.on('click', 'cluster-spots', function (e) {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['cluster-spots']
    });
    const clusterId = features[0].properties.cluster_id;
    map.getSource('spots').getClusterExpansionZoom(clusterId, function (err, zoom) {
      if (err) return;

      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom: zoom
      });
    });
  });

  map.on('click', 'unclustered-point-spots', function (e) {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);

    map.flyTo({
      center: e.features[0].geometry.coordinates,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      zoom: 16
    });

    // toggle #offcanvas element
    const offcanvas = document.getElementById('offcanvasRight');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
    bsOffcanvas.toggle();
  });

  map.on('mouseenter', 'unclustered-point-spots', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'unclustered-point-spots', function () {
    map.getCanvas().style.cursor = '';
  });

  map.on('mouseenter', 'cluster-spots', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'cluster-spots', function () {
    map.getCanvas().style.cursor = '';
  });
}

mapboxScript.onload = async function () {
  const map = createMap();
  const spotsGeojson = await getSpotsData();
  let filteredSpotsGeojson = spotsGeojson;
  map.on('load', async () => {
    await addSpotLayer(map, filteredSpotsGeojson);
  });

  const toggles = document.querySelectorAll('#toggle-container input[type="checkbox"]');
  const filterOptions = {
    'report': true,
    'planned': true,
    'ads': true,
  }
  // toggle.addEventListener('change', async (e) => {
  //   filterOptions['report'] = e.target.checked;
  //   console.log(filterOptions);

  //   filteredSpotsGeojson = {
  //     type: 'FeatureCollection',
  //     features: spotsGeojson.features.filter((spot) => {
  //       let allow = true;
  //       if (!filterOptions['report'] && spot.properties.hasReport) {
  //         return false;
  //       }
  //       if (!filterOptions['planned'] && spot.properties.planned === 'Đã quy hoạch') {
  //         return false;
  //       }
  //       if (!filterOptions['ads'] && spot.properties.hasAds) {
  //         return false;
  //       }
  //       return allow;
  //     })
  //   };

  //   map.getSource('spots').setData(filteredSpotsGeojson);

  // });

  toggles.forEach((toggle) => {
    toggle.addEventListener('change', async (e) => {
      console.log(e.target.id);
      const key = e.target.id.split('-')[0];
      filterOptions[key] = e.target.checked;
      console.log(filterOptions);

      filteredSpotsGeojson = {
        type: 'FeatureCollection',
        features: spotsGeojson.features.filter((spot) => {
          let allow = true;
          if (!filterOptions['report'] && spot.properties.hasReport) {
            return false;
          }
          if (!filterOptions['planned'] && spot.properties.planned === 'Đã quy hoạch') {
            return false;
          }
          if (!filterOptions['ads'] && spot.properties.hasAds) {
            return false;
          }
          return allow;
        })
      };

      map.getSource('spots').setData(filteredSpotsGeojson);

    });
  });


};
