/* eslint-disable no-undef */
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29rYXZuMTEiLCJhIjoiY2xuenJ6Nm02MHZvajJpcGVreXpmZm8wNCJ9.a3zQ4KrnD9YRRco8l4o-Pg';


var mapboxScript = document.createElement('script');
mapboxScript.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js');
document.head.appendChild(mapboxScript);

let description = '';
let district = '';
let ward = '';
let long = '';
let lat = '';

mapboxScript.onload = function () {
	mapboxgl.accessToken = MAPBOX_TOKEN;

	const marker = new mapboxgl.Marker({
		color: '#F84C4C'
	});

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

	// Show the info popup box when a random point is clicked.
	map.on('click', (e) => {
		if (map.getCanvas().style.cursor === 'pointer') {
			return;
		}
		marker.setLngLat(e.lngLat).addTo(map);

		const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${MAPBOX_TOKEN}`;

		fetch(api)
		.then(res => res.json())
		.then(res => {
			const coordinates = res.features[0].geometry.coordinates.slice();
			description = res.features[0].place_name
			.replace(/,\s*\d+,\s*Vietnam/, '')
			.replace(/, Ho Chi Minh City|, Quận|, Phường|, Q|, F|, P.*/g, '')
			.replace(/,.*Dist\.|,.*Ward\./, '');

            district = res.features[0].context[2].text || '';
            ward = res.features[0].context[0].text || '';
            long = res.features[0].geometry.coordinates[0] || '';
            lat = res.features[0].geometry.coordinates[1] || '';

            let address = ''
			
			address = description + (', ' + res.features[0].context[0].text || '') + (', ' + res.features[0].context[2].text || '');

			const innerHtmlContent = `<div style="font-weight: bold; font-size: 15px">${address}</div>`;
			const divElement = document.createElement('div');

			divElement.innerHTML = innerHtmlContent;

            const assignBtn = document.createElement('div');

            assignBtn.innerHTML = '<button class="btn btn-success btn-simple text-white mt-2" style="font-size: 13px" id="select-btn" >Chọn điểm này</button></a>';
            divElement.appendChild(assignBtn);
			
			new mapboxgl.Popup({ offset: [0, -30] })
			.setLngLat(coordinates)
			.setDOMContent(divElement)
			.addTo(map);

		});
	})

	// Change the cursor to grab when user drag the map
	map.on('dragstart', () => {
		map.getCanvas().style.cursor = 'move';
	});
	map.on('dragend', () => {
		map.getCanvas().style.cursor = '';
	});
}

document.addEventListener('click', (event) => {
    if (event.target.id === 'select-btn') {
        const popup = document.querySelector('.mapboxgl-popup');
        popup.remove();
        const data = {
            number: description,
            district: district,
            ward: ward,
            long: long,
            lat: lat
        }
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        window.opener.postMessage(data, '*');
    }
})
