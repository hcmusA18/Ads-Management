import { toolbars } from './utilities.js'
import * as reportService from '../../services/reportService.js'
import * as districtService from '../../services/districtService.js'

const controller = {}

controller.show = async (req, res) => {
  let tableData = []
  const tableHeads = [
    'ID Báo cáo',
    'ID Điểm/Bảng QC',
    'Quận',
    'Loại hình',
    'Người gửi',
    'Email',
    'Ngày gửi',
    'Trạng thái'
  ]
  let { spotMostReported, boardMostReported, districtMostReported } = [0, 0, 0]
  let spotCnt = {}
  let boardCnt = {}
  let districtCnt = {}
  let spotMaxId
  let boardMaxId
  let districtMaxId

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

  let objectIDs = []
  tableData = await reportService.getReportsWithDistrictID()
  tableData = tableData.map((report) => {
    objectIDs.push({
      ads_id: report.objectID,
      isSpot: report.isSpot,
      districtName: report.districtName
    })
    return {
      id: report.reportID,
      ads_id: report.objectID,
      district: report.districtName,
      ads_type: report.reporterName,
      sender: report.reporterName,
      email: report.reporterEmail,
      date: report.sendTime.toLocaleDateString('vi-VN'),
      status: report.status === 0 ? 'Đang chờ duyệt' : report.status === 1 ? 'Đã duyệt' : 'Đã từ chối',
      actions: {
        edit: false,
        remove: false,
        info: true
      }
    }
  })

  objectIDs.map((ad) => {
    let isSpot = ad.isSpot
    let districtName = ad.districtName

    if (isSpot) {
      if (ad.ads_id in spotCnt) {
        spotCnt[ad.ads_id] += 1
      } else {
        spotCnt[ad.ads_id] = 1
      }
    } else {
      if (ad.ads_id in boardCnt) {
        boardCnt[ad.ads_id] += 1
      } else {
        boardCnt[ad.ads_id] = 1
      }
    }

    if (districtName in districtCnt) {
      districtCnt[districtName] += 1
    } else {
      districtCnt[districtName] = 1
    }
  })

  spotMostReported = -1
  for (let key in spotCnt) {
    if (spotCnt[key] > spotMostReported) {
      spotMostReported = spotCnt[key]
      spotMaxId = key
    }
  }

  boardMostReported = -1
  for (let key in boardCnt) {
    if (boardCnt[key] > boardMostReported) {
      boardMostReported = boardCnt[key]
      boardMaxId = key
    }
  }

  console.log('District')
  console.log(districtCnt)

  districtMostReported = -1
  for (let key in districtCnt) {
    if (districtCnt[key] > districtMostReported) {
      districtMostReported = districtCnt[key]
      districtMaxId = key
    }
  }

  let statisticalData = {
    spotMaxId: spotMaxId,
    boardMaxId: boardMaxId,
    districtMaxId: districtMaxId
  }

  const title = 'Sở - Thống kê báo cáo'
  return res.render('./so/reports', { title, tableHeads, tableData, toolbars, statisticalData, ...commonData })
}

controller.showDetail = async (req, res) => {
  const id = req.params.id
  let data = {}
  data = await reportService.getReportByID(id)
  const detail = {
    id: data.reportID,
    ads_id: data.objectID,
    ads_type: data.reportTypeName,
    sender: data.reporterName,
    phone: data.reporterPhone,
    email: data.reporterEmail,
    report_type: data.reportTypeName,
    date: data.sendTime.toLocaleDateString('vi-VN'),
    state: data.status === 0 ? 'Đang chờ duyệt' : data.status === 1 ? 'Đã duyệt' : 'Đã từ chối',
    content: data.reportInfo,
    solution: data.solution,
    images: data.reportImages
  }
  const title = 'Sở - Chi tiết báo cáo'
  return res.render('./so/report-detail', { title, detail, toolbars })
}

export default controller
