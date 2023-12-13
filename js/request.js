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

let accessToken = "";

export const getAccessToken = async () => {
  return $.ajax({
    beforesend: function (req) {
      req.setRequestHeader('Allow-Control-Allow-Origin', '*');
    },
    url: `${requestHostname}/imgur`,
    type: 'GET',
    crossDomain: true,
  })
}

export const uploadImage = async (files) => {
  const links = [];
  if (accessToken === "") {
    accessToken = await getAccessToken();
  }
  files.forEach(async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const link = await $.ajax({
      beforesend: function (req) {
        req.setRequestHeader('Allow-Control-Allow-Origin', '*');
      },
      url: 'https://api.imgur.com/3/image',
      type: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
      processData: false,
      contentType: false,
    });
    links.push(link.data.link);
  });
  return links;
}

export const uploadReport = async (report) => {
  return $.ajax({
    beforesend: function (req) {
      req.setRequestHeader('Allow-Control-Allow-Origin', '*');
    },
    url: `${requestHostname}api/reports`,
    type: 'POST',
    crossDomain: true,
    data: report,
  })
}

export const getReport = async (reportID) => {
  return $.ajax({
    beforesend: function (req) {
      req.setRequestHeader('Allow-Control-Allow-Origin', '*');
    },
    url: `${requestHostname}api/reports/${reportID}`,
    type: 'GET',
    crossDomain: true,
  })
}


export default {
  getAllSpots,
  getDetailSpot,
  uploadImage,
  uploadReport,
  getReport,

}
