/* eslint-disable no-undef */
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29rYXZuMTEiLCJhIjoiY2xuenJ6Nm02MHZvajJpcGVreXpmZm8wNCJ9.a3zQ4KrnD9YRRco8l4o-Pg';


var mapboxScript = document.createElement('script');
mapboxScript.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js');
document.head.appendChild(mapboxScript);

let curPos = null;

const formatMapFeature = (feature) => {
  const { properties, text } = feature
  let address = properties.address ? properties.address.split(',')[0] : feature.place_name.split(',')[0]
  const coordinates = feature.geometry.coordinates.slice()

  address = address.replace(/"/g, '')
  address += `, ${feature.context[0].text || ''}, ${feature.context[2].text || ''}, ${feature.context[3].text || ''}`
  if (address.includes(text)) {
    address = address.replace(`${text}, `, '')
  }

  return {
    text,
    address,
    coordinates
  }
}

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
			curPos = res.features[0];
			const {text, address, coordinates} = formatMapFeature(res.features[0]);

			const innerHtmlContent = `<h6 class="fw-bolder"><i class="bi bi-geo-alt"></i> Thông tin địa điểm</h6>
									  <p class="fw-bold">${text}</p>
									  <p class="fw-light">${address}</p>`;
			const divElement = document.createElement('div');
			
			divElement.innerHTML = innerHtmlContent;
			divElement.setAttribute('class', 'px-4 py-3 rounded-2 bg-success text-success-emphasis bg-opacity-25');

            const assignBtn = document.createElement('div');

            assignBtn.innerHTML = '<button class="btn btn-success btn-simple text-white mt-2" style="font-size: 13px" id="select-btn" >Chọn điểm này</button></a>';
            divElement.appendChild(assignBtn);
			
			new mapboxgl.Popup({ offset: [0, -30] })
			.setLngLat({lng: e.lngLat.lng, lat: e.lngLat.lat})
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
		let {text, address, coordinates} = formatMapFeature(curPos);
		address = address
		.replace(/,\s*\d+,\s*Vietnam/, '')
		.replace(/(Phường).*?,/, '')
		.replace(/(Quận).*?,/, '')
		.replace(/(Thành phố).*?,/, '')
		.replace(/(P).*?,/, '')
		.replace(/(Q).*?,/, '')
		.replace(/(F).*?,/, '')
		.replace('Ho Chi Minh City', '')
		.replace(/,.*Dist/, '')
		.replace(/,.*District/, '')
		.replace(/,.*Hồ Chí Minh/, '')
		.replace(/,.*ward/, '')
		.replace(/,.*Ward/, '')

		// remove all special characters at the end of the string
		address = address.replace(/[\W_]+$/, '');
        const data = {
            number: address,
            district: curPos.context[2].text || '',
            ward: curPos.context[0].text || '',
            long: coordinates[0] || '',
            lat: coordinates[1] || '',
        }
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        window.opener.postMessage(data, '*');
    }
})
