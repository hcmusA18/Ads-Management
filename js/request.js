// using ajax to get data from server

const getAllSpots = () => {
  return $.ajax({
    beforesend: function (req) {
      req.setRequestHeader('Allow-Control-Allow-Origin', '*');
    },
    url: 'http://localhost:8080/api/spots',
    type: 'GET',
    crossDomain: true,
  })
}

export default {
  getAllSpots,
}
