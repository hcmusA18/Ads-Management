import { toolbars } from './utilities.js'
import * as districtService from '../../services/districtService.js'
import * as wardService from '../../services/wardService.js'
import * as spotService from '../../services/spotService.js'
import * as boardService from '../../services/boardService.js'
import * as locationService from '../../services/locationService.js'

const controller = {}

controller.findAllDistricts = async (req, res) => {
  const inputs = {
    title: 'Sở - Quản lý Quận',
    toolbars: toolbars,
    districts: await locationService.getAll(),
    wardsTotal: await wardService.countAll(),
    spotsTotal: await spotService.countAll(),
    boardsTotal: await boardService.countAll(),
  }
  return res.render('./so/locations', inputs)
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

export default controller;
