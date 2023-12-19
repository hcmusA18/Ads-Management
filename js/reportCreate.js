import {
  upload2Imgur, uploadReport, getReportTypes
} from '/js/request.js';

const urlParams = new URLSearchParams(window.location.search);
const objectID = urlParams.get('id');
console.log(objectID)
$('#object-id').val(objectID);

const reportTypes = await getReportTypes();
console.log(reportTypes);
const reportTypeSelect = document.getElementById('report-type');
// remove all options
reportTypeSelect.innerHTML = '';
reportTypeSelect.innerHTML = '<option selected>Chọn 1 loại hình báo cáo</option>';
reportTypes.forEach((type) => {
  const option = document.createElement('option');
  option.value = type.typeID;
  option.innerText = type.typeName;
  reportTypeSelect.appendChild(option);
})


const submitHandler = async (e) => {
  e.preventDefault();
  const inputImage = document.getElementById('input-image');
  const files = inputImage.files;
  let imgUrls = [];
  console.log(files);
  if (files.length > 0){
    imgUrls = await upload2Imgur(files);
    console.log(imgUrls);
  }

  const data = {
    objectID: objectID,
    reportImages: imgUrls,
    reportType: reportTypeSelect.value,
    reporterName: document.getElementById('sender-name').value,
    reporterPhone: document.getElementById('phone').value,
    reporterEmail: document.getElementById('email').value,
    reportInfo: tinymce.activeEditor.getContent(),
  }
  console.log('Will send data', data);

  const reportID = await uploadReport(data);

  // append the reportID to the local storage
  const reportIDs = localStorage.getItem('reportIDs');
  if (reportIDs) {
    localStorage.setItem('reportIDs', `${reportIDs},${reportID}`);
  } else {
    localStorage.setItem('reportIDs', `${reportID}`);
  }

  console.log(reportID);
  if (reportID) {
    alert('Báo cáo thành công');
    window.location.href = '/index.html';
  } else {
    alert('Báo cáo thất bại');
  }
}
const cancelHandler = (e) => {
  console.log('cancel');
  e.preventDefault();

  // ask the user to confirm
  const isConfirmed = confirm('Bạn có chắc chắn muốn huỷ?');
  if (!isConfirmed) return;

  window.history.back();
}

document.getElementById('submitBtn').addEventListener('click', submitHandler);
document.getElementById('cancelBtn').addEventListener('click', cancelHandler);
