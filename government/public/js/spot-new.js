const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29rYXZuMTEiLCJhIjoiY2xuenJ6Nm02MHZvajJpcGVreXpmZm8wNCJ9.a3zQ4KrnD9YRRco8l4o-Pg'
function updateTitle(el) {
  const title = document.querySelector('#spotTitle')
  title.textContent = el.value
}

const addr = document.querySelector('#spotAddress')
const dist = document.querySelector('#districtName')
const ward = document.querySelector('#wardName')
const queryParams = new URLSearchParams(window.location.search)

if (queryParams.get('lng') !== undefined && queryParams.get('lat') !== undefined) {
  const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${queryParams.get('lng')},${queryParams.get(
    'lat'
  )}.json?access_token=${MAPBOX_TOKEN}`

  const lng_field = document.querySelector('#longitude')
  const lat_field = document.querySelector('#latitude')

  lng_field.value = queryParams.get('lng')
  lat_field.value = queryParams.get('lat')

  fetch(api)
    .then((res) => res.json())
    .then((res) => {
      let description = res.features[0].place_name
			.replace(/,\s*\d+,\s*Vietnam/, '')
			.replace(/, Ho Chi Minh City|, Quận|, Phường|, Q|, F|, P|, District|, Ward.*/g, '')
			.replace(/,.*Dist\.|,.*Ward\./, '');

      addr.value = description || ' '
      dist.value = res.features[0].context[2].text.replace('Quận ', '').trim() || ' '
      ward.value = res.features[0].context[0].text.replace('Phường ', '').trim() || ' '
      if (dist.value.length === 1) {
        dist.value = '0' + dist.value
      }
    })
}

