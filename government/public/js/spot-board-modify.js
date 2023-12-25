const addBtn = document.getElementById('add-button');
const removeBtn = document.getElementById('remove-button');
const imgUrls = Array.from(document.querySelectorAll('.thumbnails-item img')).map(img => img.src);


// Add new image

addBtn.addEventListener('click', () => {
  inputImage.click();
});

let accessToken = null;

const getAccessToken = async () => {
  const response = await fetch('/imgur');
  const data = await response.json();
  return data.accessToken;
}

const upload2Imgur = async (files) => {
  const links = []
  if (!accessToken) {
    accessToken = await getAccessToken();
  }
  for (let i = 0; i < files.length; i++) {
    const formData = new FormData()
    formData.append('image', files[i])
    console.log('Uploading: ', files[i].name);
    const headers = new Headers()
    headers.append('Authorization', 'Bearer ' + accessToken)
    const response = await fetch('https://api.imgur.com/3/image', {
      headers: headers,
      method: 'POST',
      body: formData,
      redirect: 'follow'
    });
    const data = await response.json()
    links.push(data.data.link);
  }
  console.log(links);
  return links;
}
const submitHandler = async (e) => {
  e.preventDefault();
  const inputImage = document.getElementById('input-image');
  const files = inputImage.files;
  let imgUrlsData = await upload2Imgur(files);
  imgUrlsData = imgUrlsData.concat(getUpdatedImgUrls());
  // console.log(imgUrlsData);

  const data = {
    spotID: document.getElementById('spotID').value,
    adsImages: imgUrlsData,
    companyName: document.getElementById('compName').value,
    companyPhone: document.getElementById('compPhone').value,
    companyEmail: document.getElementById('compEmail').value,
    companyAddress: document.getElementById('compAddress').value,
    startDate: document.getElementById('startDate').value,
    endDate: document.getElementById('endDate').value,
    content: document.getElementById('content').value,
    reason: document.getElementById('reason').value,
    officerUsername: '<%= user.username %>'
  }
  const url = '<%= url %>';
  const requestUrl = url.replace('/modify', '');
  console.log('Request URL: ', requestUrl);
  const result = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  console.log(result);
}

document.getElementById('submitBtn').addEventListener('click', (e) => {
  e.preventDefault();
  // console.log('====================================');
  // console.log('submit');
  // console.log('====================================');
  submitHandler(e);
});



// Remove image

const removeCurrentImage = () => {
  // console.log(imgUrls);
  const currentIndex = Array.from(document.querySelectorAll('.thumbnails-item')).findIndex(thumbnail => !thumbnail.classList.contains('d-none'));

  if (currentIndex !== -1) {
    imgUrls.splice(currentIndex * 3, 3);
    updateThumbnails();
  }
}

const updateThumbnails = () => {
  const thumbnails = document.querySelectorAll('.thumbnails-item');

  thumbnails.forEach((thumbnail, index) => {
      const start = index * 3;
      
      thumbnail.querySelectorAll('img').forEach((img, imgIndex) => {
          img.src = imgUrls[(start + imgIndex) % imgUrls.length];
      });
  });

  document.querySelectorAll('.thumbnails-item').forEach((thumbnail, index) => {
      thumbnail.classList.toggle('d-none', index !== 0);
  });

  document.getElementById('mainImg').src = imgUrls[0];

  document.querySelectorAll('img.border').forEach(img => {
      img.classList.remove('border', 'border-primary');
  });
  document.querySelector('.thumbnails-item:not(.d-none) img').classList.add('border', 'border-primary');
}

const getUpdatedImgUrls = () => {
  let newImgUrls = [];
  const n = imgUrls.length/3;

  for (let i=0; i<n; ++i) {
    newImgUrls.push(imgUrls[i*3+1]);
  }

  // remove the last element and add it to the top
  newImgUrls.unshift(newImgUrls.pop());

  return newImgUrls;
}