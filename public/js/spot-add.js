const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29rYXZuMTEiLCJhIjoiY2xuenJ6Nm02MHZvajJpcGVreXpmZm8wNCJ9.a3zQ4KrnD9YRRco8l4o-Pg'
function updateTitle(el) {
  const title = document.querySelector('#diemdat-title')
  title.textContent = el.value
}

const addr = document.querySelector('#diachi')
const dist = document.querySelector('#quan')
const ward = document.querySelector('#phuong')
const queryParams = new URLSearchParams(window.location.search)

if (queryParams.get('lng') !== undefined && queryParams.get('lat') !== undefined) {
  const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${queryParams.get('lng')},${queryParams.get(
    'lat'
  )}.json?access_token=${MAPBOX_TOKEN}`

  const lng_field = document.querySelector('#lng')
  const lat_field = document.querySelector('#lat')

  lng_field.value = queryParams.get('lng')
  lat_field.value = queryParams.get('lat')

  fetch(api)
    .then((res) => res.json())
    .then((res) => {
      let description = res.features[0].place_name
			.replace(/,\s*\d+,\s*Vietnam/, '')
			.replace(/, Ho Chi Minh City|, Quận|, Phường|, Q|, F|, P.*/g, '')
			.replace(/,.*Dist\.|,.*Ward\./, '');

      addr.value = description || ' '
      dist.value = res.features[0].context[2].text.replace('Phường ', '') || ' '
      ward.value = res.features[0].context[0].text.replace('Quận ', '') || ' '
    })
}
