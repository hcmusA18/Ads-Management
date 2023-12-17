import { toolbars } from './utilities.js'
import * as reportService from '../../services/reportService.js'
import * as districtService from '../../services/districtService.js'

const controller = {}


const convertDate = (date) => {
	const dateObject = new Date(date);

	const day = dateObject.getDate().toString().padStart(2, '0');
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
	const year = dateObject.getFullYear();

	return `${day}/${month}/${year}`;
}

controller.show = async (req, res) => {
  let tableData = []
  const tableHeads = [
    'ID Báo cáo', 'ID Điểm/Bảng', 'Quận', 'Phường', 'Loại hình', 'Người gửi', 'Ngày gửi', 'Trạng thái'
  ];

  const role = String(req.originalUrl.split('/')[1])

  let checkboxData = await districtService.getAllDistricts()
  checkboxData = checkboxData.map((dist) => `Quận ${dist.districtName}`)
  let checkboxHeader = 'Thành phố Hồ Chí Minh'

  const commonData = {
    url: req.originalUrl,
    role: role,
    checkboxData: checkboxData,
    checkboxHeader: checkboxHeader
  }
  
  const data = await reportService.getAllReports();
  // console.log(data);
  tableData = data.map((item) => {
    return {
      id: item.reportID,
      objectID: item.objectID,
      district: item.spotDistrictName[0],
      ward: item.spotWardName[0],
      reportType: item.reportType,
      reporterName: item.reporterName,
      sendTime: convertDate(item.sendTime),
      state: item.status === 1 ? "Đã xử lý" : "Đang xử lý",
      actions: {
        edit: false,
        remove: false,
        info: true
      }
    }
  })
  // console.log(tableData);

  const title = 'Sở - Quản lý danh sách các báo cáo vi phạm'
  return res.render('./so/reports', { title, tableHeads, tableData, toolbars, ...commonData })
}

controller.showDetail = async (req, res) => {
  const id = req.params.id
  const dataFetch = await reportService.getReportByID(id);
  const detail = {
		id: dataFetch.reportID,
		phone: dataFetch.reporterPhone,
		state: dataFetch.status,
		objectID: dataFetch.objectID,
		reportType: dataFetch.reportTypeName,
		sendTime: convertDate(dataFetch.sendTime),
		name: dataFetch.reporterName,
		email: dataFetch.reporterEmail,
		content: dataFetch.reportInfo,
		solution: dataFetch.solution,
		imgUrls: [...dataFetch.reportImages],
		officer: dataFetch.officerName,
		district: dataFetch.officerDistrict,
		ward: dataFetch.officerWard,
	}
  const title = 'Sở - Chi tiết báo cáo vi phạm'
  return res.render('./so/report-detail', { title, detail, toolbars })
}

export default controller
