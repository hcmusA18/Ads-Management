import { getReportList } from "./request.js";

let reportIDs = localStorage.getItem('reportIDs');
reportIDs = reportIDs ? reportIDs.split(',') : [];

console.log(reportIDs);

const reportData = await getReportList(reportIDs);
console.log(reportData);

const table = $('#table');
const formater = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

const boardData = reportData.map((report) => ({
  id: report.reportID,
  object_id: report.objectID,
  district: report.spotDistrictName,
  ward: report.spotWardName,
  type: report.reportType,
  send_time: formater.format(new Date(report.sendTime)),
  status: report.status === 0 ? `<span class="text-danger">Chờ xử lý</span>` : `<span class="text-success">Đã xử lý</span>`,
  detail: `<div class="d-flex flex-row align-items-center justify-content-center">
            <a href="./report-detail.html?id=${report.reportID}">
              <img src="./assets/info.svg" alt="edit-icon" style="background-color: transparent"/>
            </a>
          </div>`
}));

table.bootstrapTable("load", boardData);
