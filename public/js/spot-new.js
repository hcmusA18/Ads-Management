const MAPBOX_TOKEN = 'pk.eyJ1IjoiY29rYXZuMTEiLCJhIjoiY2xuenJ6Nm02MHZvajJpcGVreXpmZm8wNCJ9.a3zQ4KrnD9YRRco8l4o-Pg'
function updateTitle(el) {
  const title = document.querySelector('#spotTitle')
  title.textContent = el.value
}

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

const addr = document.querySelector('#spotAddress')
const dist = document.querySelector('#districtName')
const ward = document.querySelector('#wardName')
const queryParams = new URLSearchParams(window.location.search)
const reverseGeoCodingApiKey = 'iFRNmnpm9tPfPuSWFtpk3VDDI3xKUuNDxy0EHKjJlF4';

if (queryParams.get('lng') !== undefined && queryParams.get('lat') !== undefined) {
  const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${queryParams.get('lat')},${queryParams.get('lng')}&apiKey=${reverseGeoCodingApiKey}&lang=vi&limit=5`;

  const lng_field = document.querySelector('#longitude')
  const lat_field = document.querySelector('#latitude')

  lng_field.value = queryParams.get('lng')
  lat_field.value = queryParams.get('lat')

  fetch(api)
    .then((res) => res.json())
    .then((res) => {
      let address = res.items[0].address.label;
      addr.value = address.split(',')[0] || ' '
      dist.value = res.items[0].address.city.replace('Quận ', '').trim() || ' '
      if (dist.value.length === 1) {
        dist.value = '0' + dist.value
      }
      ward.value = res.items[0].address.district.replace('Phường ', '').trim() || ' '
      if (ward.value.length === 1) {
        ward.value = '0' + ward.value
      }
    })
}

