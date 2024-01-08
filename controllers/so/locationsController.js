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

  return res.render('./so/locations', {
    tableData, totalBoard, totalSpot, totalWard,
    toolbars: toolbars,
    title: 'Sở - Quản lý danh sách Quận'});
}

controller.locationsDetails = async (req, res) => {
  let districtID = req.query.quan;

  let districtDetail = await locationService.getDistrictDetail(districtID);
  districtDetail = districtDetail[0];
  // console.log(districtDetail);

  const wards = await locationService.getDetails(districtID);
  // console.log(wards);

  const districts = await districtService.getAllDistricts();
  // console.log(districts);


  res.render('./so/location-detail', {
    districtID,
    districtDetail: districtDetail,
    wards,
    districts,
    title: 'Sở - Quản lý Phường',
    toolbars: toolbars,
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
      res.status(200).json({message: message});
		}
	} catch (error) {
		console.log(error.message);
		req.flash('error', error.message);
    res.status(500).json({message: error.message});
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
    res.status(200).json({message: message});
	} catch (error) {
		console.log(error.message);
		req.flash('error', error.message);
    res.status(500).json({message: error.message});
	}
}

controller.addWard = async (req, res) => {
  const curDistrict = req.query.quan;
  const data = {
    wardID: req.body.wardID,
    wardName: req.body.wardName,
    districtID: curDistrict,
  };
  // console.log(data);

  try {
		const message = await wardService.createWard(data);
		console.log(message);
		req.flash('success', message);
		res.redirect(`/so/locations-detail?quan=${curDistrict}`);
	} catch (error) {
		console.log(error.message);
		req.flash('error', error.message);
		res.redirect(`/so/locations-detail?quan=${curDistrict}`);
	}
}

controller.deleteWard = async (req, res) => {
  const curDistrict = req.query.quan;
  const wardID = req.params.wardID;
  // console.log(districtID);
  try {
		if (wardID != null) {
			const message = await wardService.deleteWardByID(wardID);
			console.log(message);
      res.redirect(`/so/locations-detail?quan=${curDistrict}`);
		}
	} catch (error) {
		console.log(error.message);
		req.flash('error', error.message);
    res.redirect(`/so/locations-detail?quan=${curDistrict}`);
	}
}

controller.updateWard = async (req, res) => {
  const curDistrict = req.query.quan;
  const wardID = req.params.wardID;
  const data = req.body;

  // console.log(districtID);
  // console.log(data);

  try {
		const message = await wardService.updateWardByID(wardID, data);
		console.log(message);
		// res.redirect(`/so/locations-detail?quan=${curDistrict}`);
    res.status(200).json({message: message});
	} catch (error) {
		console.log(error.message);
		req.flash('error', error.message);
		// res.redirect(`/so/locations-detail?quan=${curDistrict}`);
    res.status(500).json({message: error.message});
	}
}

export default controller;
