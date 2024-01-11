/* eslint-disable no-undef */
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29rYXZuMTEiLCJhIjoiY2xuenJ6Nm02MHZvajJpcGVreXpmZm8wNCJ9.a3zQ4KrnD9YRRco8l4o-Pg';
const reverseGeoCodingApiKey = 'iFRNmnpm9tPfPuSWFtpk3VDDI3xKUuNDxy0EHKjJlF4';

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

const closeBtn = document.getElementById('close-search-btn');
const searchInput = document.getElementById('search-input');
const resultBox = document.querySelector('.result-box');
let lastSearch = '';
searchInput.addEventListener('keyup', (e) => {
  let searchValue = searchInput.value;
  searchValue = searchValue.trim();
  if (searchValue === '' || searchValue === lastSearch) {
    return;
  }
  const api = `https://revgeocode.search.hereapi.com/v1/geocode?q=${searchValue}&apiKey=${reverseGeoCodingApiKey}&lang=vi&in=countryCode:VNM&limit=5`;

  lastSearch = searchValue;

    fetch(api)
        .then((res) => res.json())
        .then((res) => {
            if (res && res.items && res.items.length > 0) {
            const result = res.items.map((item) => {
                return {
                title: item.address.label,
                lat: item.position.lat,
                lng: item.position.lng,
                };
            });
            displaySearchResult(result);
            }
        });
});

const displaySearchResult = (result) => {
  const content = result.map((item) => {
    return `
    <a  href='#'
        class='list-group-item list-group-item-action border-0 rounded-0 list-search-item'
        data-bs-lat='${item.lat}' 
        data-bs-lng='${item.lng}'
        data-bs-title='${item.title}'
        style='cursor: pointer; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 23.5rem; font-size:0.875rem; line-height: 1.25rem'>${item.title}    
    </a>`;
  });
  resultBox.innerHTML = `<div class='list-group'>${content.join('')}</div>`;
};

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


	// const geocoder = new MapboxGeocoder({
	// 	accessToken: mapboxgl.accessToken,
	// 	mapboxgl: mapboxgl,
	// 	countries: 'vn',
	// 	language: 'vi-VN',
	// 	localIdeographFontFamily: '\'Montserrat\', \'sans-serif\'',
	// });
	// map.addControl(
    //     geocoder,
    //     'top-left'
	// );

	// Show the info popup box when a random point is clicked.
	map.on('click', (e) => {
		if (map.getCanvas().style.cursor === 'pointer') {
			return;
		}
		marker.setLngLat(e.lngLat).addTo(map);

		const reverseGeoCodingApiKey = 'iFRNmnpm9tPfPuSWFtpk3VDDI3xKUuNDxy0EHKjJlF4';

		const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${e.lngLat.lat},${e.lngLat.lng}&apiKey=${reverseGeoCodingApiKey}&lang=vi`;

		fetch(api)
		.then(res => res.json())
		.then(res => {
			curPos = res.items[0];
			let address = res.items[0].address.label;
			address = address.replace(', Hồ Chí Minh, Việt Nam', '');
			const innerHtmlContent = `<h6 class="fw-bolder"><i class="bi bi-geo-alt"></i> Thông tin địa điểm</h6>
									  <p class="fw-light" style="font-size: 15px;">${address}</p>`;
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

	closeBtn.addEventListener('click', () => {
		resultBox.innerHTML = '';
		searchInput.value = '';
	});
}

document.addEventListener('click', (event) => {
    if (event.target.id === 'select-btn') {
        const popup = document.querySelector('.mapboxgl-popup');
        popup.remove();

		const address = curPos.address.label.split(',')[0] || ' ';


        const data = {
            number: address,
            district: curPos.address.city.replace('Quận ', '').trim() || ' ',
            ward: curPos.address.district.replace('Phường ', '').trim() || '',
            long: curPos.position.lng || '',
            lat: curPos.position.lat || '',
        }
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        window.opener.postMessage(data, '*');
    }
})
