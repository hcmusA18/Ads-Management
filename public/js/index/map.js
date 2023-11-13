/* eslint-disable no-undef */
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29rYXZuMTEiLCJhIjoiY2xuenJ6Nm02MHZvajJpcGVreXpmZm8wNCJ9.a3zQ4KrnD9YRRco8l4o-Pg'


var mapboxScript = document.createElement('script');
mapboxScript.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js');
document.head.appendChild(mapboxScript);

function addAdvertisementSource(map) {
	map.loadImage(
			'/images/blue_elip.png',
			(error, image) => {
				if (error) throw error;
				map.addImage('quang-cao', image);
				// Add a GeoJSON source with 2 points
				map.addSource('diem-dat', {
					'type': 'geojson',
					'data': {
						'type': 'FeatureCollection',
						'features': [
							{
								// feature for Mapbox DC
								'type': 'Feature',
								'geometry': {
									'type': 'Point',
									'coordinates': [106.694444, 10.782402]
								},
								'properties': {
									'title': 'Đại học Kiến trúc TP.HCM'
								}
							},
							{
								'type': 'Feature',
								'properties': {
									'title': 'Dinh Độc Lập',
									'description': 'Là Dinh Độc Lập'
								},
								'geometry': {
									'coordinates': [106.695316, 10.776984],
									'type': 'Point'
								}
							},
							{
								'type': 'Feature',
								'properties': {
									'title': 'Hồ Con rùa',
									'description': 'Hồ Con rùa'
								},
								'geometry': {
									'coordinates': [106.695917, 10.782689],
									'type': 'Point'
								}
							},
							{
								'type': 'Feature',
								'properties': {
									'title': 'Công viên Tao Đàn',
									'description': 'Công viên Tao Đàn'
								},
								'geometry': {
									'coordinates': [106.691357, 10.772957],
									'type': 'Point'
								}
							},
							{
								'type': 'Feature',
								'properties': {
									'title': 'Nhà Văn hoá Thanh niên',
									'description': 'Nhà Văn hoá Thanh niên'
								},
								'geometry': {
									'coordinates': [106.697551, 10.78163],
									'type': 'Point'
								}
							}
						]
					}
				});

				// Add a symbol layer
				map.addLayer({
					'id': 'quang-cao',
					'type': 'symbol',
					'source': 'diem-dat',
					'layout': {
						'icon-image': 'quang-cao',
						'icon-size': 0.5,
						// get the title name from the source's "title" property
						'text-field': ['get', 'title'],
						'text-font': [
							'Montserrat SemiBold',
							'Arial Unicode MS Bold'
						],
						// 'text-offset': [0, 1.25],
						'text-anchor': 'top',
						'icon-anchor': 'bottom'
					},
					'visibility': 'visible'
				});
			}
	);
	map.on('click', 'quang-cao', function (e) {
		map.flyTo({
			center: e.features[0].geometry.coordinates,
			essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});

		// toggle #offcanvas element
		var offcanvas = document.getElementById('offcanvasRight');
		var bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
		bsOffcanvas.toggle();
	});

	map.on('mouseenter', 'quang-cao', function () {
		map.getCanvas().style.cursor = 'pointer';
	});

	map.on('mouseleave', 'quang-cao', function () {
		map.getCanvas().style.cursor = '';
	});
}

function addReportSource(map) {
	map.loadImage(
			'/images/red_elip.png',
			(error, image) => {
				if (error) throw error;
				map.addImage('bao-cao', image);
				map.addSource('diem-bao-cao', {
					type: 'geojson',
					data: {
						'type': 'FeatureCollection',
						'features': [
							{
								// feature for Mapbox SF
								'type': 'Feature',
								'geometry': {
									'type': 'Point',
									'coordinates': [106.694863, 10.783003]
								},
								'properties': {
									'title': 'Đại học Kinh tế TP.HCM'
								}
							},
						]
					}
				});

				// Add a symbol layer
				map.addLayer({
					'id': 'bao-cao',
					'type': 'symbol',
					'source': 'diem-bao-cao',
					'layout': {
						'icon-image': 'bao-cao',
						'icon-size': 0.5,
						// get the title name from the source's "title" property
						'text-field': ['get', 'title'],
						'text-font': [
							'Montserrat SemiBold',
							'Arial Unicode MS Bold'
						],
						// 'text-offset': [0, 1.25],
						'text-anchor': 'top',
						'icon-anchor': 'bottom'
					},
					'visibility': 'visible'
				});
			}
	);

	map.on('click', 'bao-cao', function (e) {
		map.flyTo({
			center: e.features[0].geometry.coordinates,
			essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});

		// toggle #offcanvas element
		var offcanvas = document.getElementById('offcanvasRight');
		var bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
		bsOffcanvas.toggle();
	});

	map.on('mouseenter', 'bao-cao', function () {
		map.getCanvas().style.cursor = 'pointer';
	});

	map.on('mouseleave', 'bao-cao', function () {
		map.getCanvas().style.cursor = '';
	});
}

function addSource(map) {
	addAdvertisementSource(map);
	addReportSource(map);
}

function attachToggle(toggleId, layerId, map) {
	if (!map.getLayer(layerId)) {
		throw new Error(`Layer ${layerId} does not exist on map.`);
	}
	const toggle = document.getElementById(toggleId);

	if (toggle == null) {
		throw new Error(`Toggle ${toggleId} does not exist.`);
	}

	toggle.addEventListener('click', () => {
		const clickedLayer = layerId;
		if (toggle.checked == true) {
			console.log(`Hiện ${clickedLayer}`);
			map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
		} else {
			console.log(`Ẩn ${clickedLayer}`);
			map.setLayoutProperty(clickedLayer, 'visibility', 'none');
		}
	});
}

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
		localIdeographFontFamily: '\'Montserrat\', \'sans-serif\'',
	});
	map.addControl(
			geocoder,
			'top-left'
	);

	// Wait until the map has finished loading.
	map.on('load', () => {
		addSource(map);
	});
	// After the last frame rendered before the map enters an "idle" state.
	map.on('idle', () => {
		// If these two layers were not added to the map, abort
		if (!map.getLayer('bao-cao') || !map.getLayer('quang-cao')) {
			return;
		}

		attachToggle('bao-cao', 'bao-cao', map);
		attachToggle('quang-cao', 'quang-cao', map);
	});
}
