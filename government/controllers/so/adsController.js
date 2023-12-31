import { toolbars } from './utilities.js'
import * as spotService from '../../services/spotService.js'
import * as boardService from '../../services/boardService.js'
import * as districtService from '../../services/districtService.js'
import * as wardService from '../../services/wardService.js'
import * as spotTypeService from '../../services/spotTypeService.js'
import * as adsFormService from '../../services/adsFormService.js'
import * as boardTypeService from '../../services/boardTypeService.js'
import * as IDGenerator from '../../services/IDGenerator.js';

const show = async (req, res) => {
  const category = req.query.category || ''
  let tableHeads = []
  let tableData = []
  let title = 'Sở - '

  let checkboxData = await districtService.getAllDistricts()
  checkboxData = checkboxData.map((dist) => `Quận ${dist.districtName}`)
  let current = 0
  try {
    switch (category) {
      case 'spot':
        title = 'Sở - Điểm đặt'
        tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại vị trí', 'Hình thức quảng cáo', 'Thông tin quy hoạch']
        tableData = await spotService.getAllSpots()
        tableData = tableData.map((spot) => ({
          id: spot.spotID,
          district: spot.districtName,
          ward: spot.wardName,
          spot: spot.spotName,
          locationType: spot.spotTypeName,
          type: spot.adsFormName,
          plan: spot.planned === 1 ? 'Đã quy hoạch' : 'Chưa quy hoạch',
          actions: {
            edit: false,
            remove: true,
            info: true
          }
        }))
        current = 0

        break
      case 'board':
        title = 'Sở - Bảng quảng cáo'
        tableHeads = ['ID', 'Quận', 'Phường', 'Điểm đặt', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng']
        tableData = await boardService.getAllBoards()
        tableData = tableData.map((board) => ({
          id: board.boardID,
          district: board.districtName,
          ward: board.wardName,
          spot: board.spotName,
          type: board.boardTypeName,
          size: `${board.width}x${board.height}m`,
          quantity: `${board.quantity} trụ / bảng`,
          actions: {
            edit: false,
            remove: true,
            info: true
          }
        }))
        current = 1
        break
      default:
        res.status(404)
        return res.render('error', { error: { status: 404, message: 'Không tìm thấy trang' } })
    }

    res.render('ads', {
      url: req.originalUrl,
      title,
      category,
      tableHeads,
      tableData,
      checkboxHeader: 'THÀNH PHỐ HỒ CHÍ MINH',
      checkboxData,
      toolbars,
      current
    })
  } catch (error) {
    // Handle errors (e.g., log them or render an error page)
    console.error(error)
    res.status(500).render('error', { error: { status: 500, message: 'Lỗi server' } })
  }
}

const showDetail = async (req, res, isEdit) => {
  const category = req.query.category || ''
  const title = 'Sở - Chi tiết ' + (category === 'spot' ? 'điểm đặt' : 'bảng quảng cáo')
  const role = String(req.originalUrl.split('/')[1])
  const ID = req.params.id || ''
  const isSpotCategory = category === 'spot' ? 1 : 0

  var data = {
    spotTitle: 'ĐỒNG KHỞI - NGUYỄN DU, SỞ VĂN HÓA VÀ THỂ THAO',
    spotId: req.params.id,
    spotAddress: '227 Nguyễn Văn Cừ',
    ward: 'Bến Nghé',
    district: 'Quận 1',
    locationType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Quảng cáo thương mại',
    plan: 'Đã quy hoạch',
    imgUrls: [
      'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%201',
      'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%202',
      'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%203',
      'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%204',
      'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%205',
      'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%206'
    ]
  }

  const getDataObject = category == 'spot' ? spotService.getSpotByID : boardService.getBoardByID
  const object = await getDataObject(ID)

  const commonData = {
    url: req.originalUrl,
    title,
    toolbars: toolbars,
    role: role
  }
  // {
  // 	spotID: 'DD0001',
  // 	address: '887 Trần Hưng Đạo',
  // 	districtID: 'Q0005',
  // 	wardID: 'P00501',
  // 	spotType: 'VT004',
  // 	planned: 0,
  // 	spotName: 'Nhà hàng Sài Gòn 2',
  // 	spotImage: [
  // 	  'https://drive.google.com/uc?export=view&id=18-945o400Cg8VZ-gNP3NKCurRbCpaga0',
  // 	  'https://drive.google.com/uc?export=view&id=1aqXkU6onBekkS4PNtJqil4R7SUTaZfVP'
  // 	],
  // 	spotTypeName: 'Chợ',
  // 	districtName: '05',
  // 	wardName: '01',
  // 	adsFormName: 'Cổ động chính trị'
  //   }
  if (isSpotCategory) {
    // console.log('Spot');
    // console.log(object)
    const { spotName, address, wardName, districtName, spotTypeName, adsFormName, planned, spotImage } = object
    data = {
      spotTitle: spotName,
      spotId: ID,
      spotAddress: address,
      wardName,
      districtName,
      spotTypeName,
      adsFormName,
      planned: planned === 1 ? 'Đã quy hoạch' : 'Chưa quy hoạch',
      imgUrls: spotImage
    }

    var boardsTableHeads = ['ID', 'Loại bảng quảng cáo', 'Kích thước', 'Số lượng']
    var boardsTableData = !isEdit ? await boardService.getBoardsOfSpot(ID) : []
    const transformedBoardsTableData = boardsTableData.map((board) => ({
      id: board.boardID,
      type: board.boardTypeName,
      size: `${board.height}x${board.width}m`,
      quantity: `${board.quantity} trụ/bảng`,
      actions: { edit: false, remove: false, info: true }
    }))

    if (isEdit) {
      let other = {}
      other.spottypes = (await spotTypeService.getAllSpotTypes()) || []
      other.adsforms = (await adsFormService.getAllAdsForms()) || []
      res.render('spot-modify', { ...commonData, ...data, other })
    } else {
      res.render('spot-detail', {
        ...commonData,
        ...data,
        boardsTableHeads,
        boardsTableData: transformedBoardsTableData
      })
    }
  } else {
    // console.log('Board');
    // console.log(object)
    data = {
      id: object.boardID,
      spotID: object.spotID,
      spotAddress: object.spotAddress,
      authCompany: object.authCompany,
      authCompanyAddress: object.authCompanyAddress,
      authCompanyPhone: object.authCompanyPhone,
      authCompanyEmail: object.authCompanyEmail,
      startDate: object.startDate.toLocaleDateString('vi-VN'),
      endDate: object.endDate.toLocaleDateString('vi-VN'),
      boardTypeName: object.boardTypeName,
      quantity: object.quantity,
      size: `${object.height}x${object.width}m`,
      spotTypeName: object.spotTypeName,
      adsFormName: object.adsFormName,
      imgUrls: object.image
    }

    if (isEdit) {
      let spots = await spotService.getAllSpots()
      res.render('board-modify', { ...commonData, ...data, spots })
    } else {
      res.render('board-detail', { ...commonData, ...data })
    }
  }
}

const showAdd = async (req, res) => {
  const category = req.query.category || ''
  let other = {}

  switch (category) {
    case 'spot':
      other.spottypes = (await spotTypeService.getAllSpotTypes()) || []
      other.adsforms = (await adsFormService.getAllAdsForms()) || []
      other.districts = (await districtService.getAllDistricts()) || []
      other.wards = (await wardService.getAllWards()) || []
      res.render('spot-new', { url: req.originalUrl, title: 'Sở - Điểm đặt mới', toolbars: toolbars, other})
      break
    case 'board':
      const spotID = req.query.spotID || '';
      const spot = (await spotService.getSpotByID(spotID)) || {};

      other.spotID = spot.spotID;
      other.spotAddress = spot.address;
      other.spotDistrict = spot.districtName;
      other.spotWard = spot.wardName;

      other.boardtypes = (await boardTypeService.getAllBoardTypes()) || [];
      // console.log(other.boardtypes);

      console.log(req.originalUrl);
      res.render('board-add', { url: req.originalUrl, title: 'Sở - Bảng quảng cáo mới', toolbars: toolbars, other })
      break
    default:
      res.status(404)
      return res.render('error', { error: { status: 404, message: 'Không tìm thấy trang' } })
  }
}

const showModify = (req, res) => {
  const category = req.query.category || ''
  switch (category) {
    case 'spot':
      res.render('spot-modify', { url: req.originalUrl, title: 'Sở - Chỉnh sửa điểm đặt', toolbars: toolbars })
      break
    case 'board':
      res.render('board-modify', { url: req.originalUrl, title: 'Sở - Chỉnh sửa bảng quảng cáo', toolbars: toolbars })
      break
    default:
      res.status(404)
      return res.render('error', { error: { status: 404, message: 'Không tìm thấy trang' } })
  }
}

const addNewSpot = async (req, res) => {
  const { spotName, spotType, address, wardID, districtID, adsForm, planned, spotImage, longitude, latitude } = req.body
  const spotID = await IDGenerator.getNewID('Spot');
  const data = {
    spotID,
    spotName,
    spotType,
    address,
    wardID,
    districtID,
    adsForm,
    planned,
    spotImage,
    longitude,
    latitude
  }
  try {
    await spotService.createSpot(data)
    res.status(200).json({ message: 'Điểm đặt mới đã được thêm thành công' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
}

const addNewBoard = async (req, res) => {
  const {boardType, quantity, height, width, spotImage} = req.body;
  const boardID = await IDGenerator.getNewID('Board');
  const spotID = req.query.spotID;
  const data = {
    boardID: boardID,
    boardType: boardType,
    quantity: quantity,
    height: height,
    width: width,
    image: spotImage,
    spotID: spotID,
    licensingID: "",
  }

  // console.log(data);
  try {
    await boardService.createBoard(data);
    res.status(200).json({ message: 'Bảng quảng cáo đã được thêm thành công' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
}

const addNew = async (req, res) => {
  const category = req.query.category || '';

  if(category == "spot"){
    addNewSpot(req, res);
    return
  }

  addNewBoard(req, res);
  return;
}


export default {
  show,
  showDetail,
  showAdd,
  showModify,
  addNew,
}
