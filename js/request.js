// using ajax to get data from server
const testHostname = "http://localhost:8080/";
const deployHostname = "https://ads-manager-1aai.onrender.com/";
const hostname = window.location.hostname;
let requestHostname = "";


const getAllSpots = () => {
  if (hostname === 'localhost') {
    requestHostname = testHostname;
  } else {
    requestHostname = deployHostname;
  }

  return $.ajax({
    beforesend: function (req) {
      req.setRequestHeader('Allow-Control-Allow-Origin', '*');
    },
    url: `${requestHostname}api/spots`,
    type: 'GET',
    crossDomain: true,
  })
}

export default {
  getAllSpots,
}
