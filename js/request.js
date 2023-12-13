// using ajax to get data from server
const testHostname = "http://localhost:8080/";
const deployHostname = "https://ads-manager-1aai.onrender.com/";
const hostname = window.location.hostname;
let requestHostname = "";


const getHostname = () => {
  if (hostname.includes("127.0.0.1") || hostname.includes("localhost")) {
    requestHostname = testHostname;
  }
  else {
    requestHostname = deployHostname;
  }
}

// auto run get hostname
getHostname();

export const getAllSpots = () => {
  return $.ajax({
    beforesend: function (req) {
      req.setRequestHeader('Allow-Control-Allow-Origin', '*');
    },
    url: `${requestHostname}api/spots`,
    type: 'GET',
    crossDomain: true,
  })
}

export const getDetailSpot = (spotID) => {
  return $.ajax({
    beforesend: function (req) {
      req.setRequestHeader('Allow-Control-Allow-Origin', '*');
    },
    url: `${requestHostname}api/spots/${spotID}`,
    type: 'GET',
    crossDomain: true,
  })
}


export default {
  getAllSpots,
  getDetailSpot,
}
