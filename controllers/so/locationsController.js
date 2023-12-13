import { toolbars } from './utilities.js'
import * as districtService from '../../services/districtService.js'
import * as wardService from '../../services/wardService.js'
import * as spotService from '../../services/spotService.js'
import * as boardService from '../../services/boardService.js'
import * as locationService from '../../services/locationService.js'

const controller = {}

controller.findAllDistricts = async (req, res) => {
  const districts = await locationService.getAll();

  const tableData = districts.map((district) => {
    return {
      districtID: district.districtID,
      districtName: `Quận ${district.districtName}`,
      cntWard: district.wardsCount,
      cntSpot: district.spotsCount,
      cntBoard: district.boardsCount
    }
  });

  const totalWard = await wardService.countAll();
  const totalSpot = await spotService.countAll();
  const totalBoard = await boardService.countAll();

  // console.log(tableData);
  // const inputs = {
  //   title: 'Sở - Quản lý danh sách Quận',
  //   toolbars: toolbars,
  //   districts: await locationService.getAll(),
  //   wardsTotal: await wardService.countAll(),
  //   spotsTotal: await spotService.countAll(),
  //   boardsTotal: await boardService.countAll(),
  // }
  return res.render('./so/locations', {
    tableData, totalBoard, totalSpot, totalWard, 
    toolbars: toolbars,
    title: 'Sở - Quản lý danh sách Quận'});
}
const getLocationDetails = async (req, res) => {
  const districtID = req.query.quan;
  const districts = await districtService.getAllDistricts();
  const wards = await locationService.getDetails(districtID);
  return res.render('./so/location-detail', { title: 'Sở - Danh sách quảng cáo phường', toolbars, districts, wards });
}
controller.locationsDetails = async (req, res) => {
  let districtID = req.query.quan;

  const [NoWards, NoBoards, NoSpots, districts, wards] = await Promise.all([
    wardService.countAll(),
    boardService.countAll(),
    spotService.countAll(),
    districtService.getAllDistricts(),
    locationService.getDetails(districtID),
  ]);
  res.render('./so/location-detail', {
    title: 'Sở - Danh sách quảng cáo phường',
    toolbars,
    districts,
    wards,
    districtID,
    NoWards,
    NoBoards,
    NoSpots,
  });
};

controller.addDistrict = async (req, res) => {
  const data = {
    districtID: req.body.districtID,
    districtName: req.body.districtName,
  };

  try {
		const message = await districtService.createDistrict(data);
		console.log(message);
		req.flash('success', message);
		res.redirect('/so/locations');
	} catch (error) {
		console.log(error.message);
		req.flash('error', error.message);
		res.redirect('/so/locations');
	}
}

controller.deleteDistrict = async (req, res) => {
  const districtID = req.params.districtID;
  // console.log(districtID);
  try {
		if (districtID != null) {
			const message = await districtService.deleteDistrictByID(districtID);
			console.log(message);
		}
	} catch (error) {
		console.log(error.message);
		req.flash('error', error.message);
	}
}

controller.updateDistrict = async (req, res) => {
  const districtID = req.params.districtID;
  const data = req.body;

  // console.log(districtID);
  // console.log(data);

  try {
		const message = await districtService.updateDistrictByID(districtID, data);
		console.log(message);
		res.redirect('/so/locations');
	} catch (error) {
		console.log(error.message);
		req.flash('error', error.message);
		res.redirect('/so/locations');
	}
}

export default controller;
