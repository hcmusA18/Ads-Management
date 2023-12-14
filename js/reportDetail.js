import { getReport } from "/js/request.js";

const urlParams = new URLSearchParams(window.location.search);
const reportID = urlParams.get('id');
const report = await getReport(reportID);
// console.log(report);

//attach data to html
document.getElementById("report-id").value = report.reportID;
document.getElementById("spot-id").value = report.objectID;
document.getElementById("status").value = report.status === 1 ? "Đã xử lý" : "Chờ xử lý";
document.getElementById("sender-name").value = report.reporterName;
document.getElementById("phone").value = report.reporterPhone;
document.getElementById("email").value = report.reporterEmail;
document.getElementById("report-type").value = report.reportTypeName;
const reportInfoHTML = new DOMParser().parseFromString(report.reportInfo, "text/html").body.firstElementChild;
if (reportInfoHTML && reportInfoHTML.innerHTML)
  document.getElementById("content").innerHTML = reportInfoHTML.innerHTML;
else document.getElementById("content").innerText = report.reportInfo;
const img_section = document.getElementById("report-img");
img_section.innerHTML = "";
report.reportImages.forEach((img) => {
  const imgHTML = `<img src="${img}" class="img-fluid" alt="...">`;
  img_section.appendChild(new DOMParser().parseFromString(imgHTML, "text/html").body.firstChild);
});
