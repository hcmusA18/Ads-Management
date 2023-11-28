import {toolbars} from './utilities.js';
import officerService from '../../services/officerService.js';
import * as districtService from '../../services/districtService.js';
import * as wardService from '../../services/wardService.js';
import * as adsFormService from '../../services/adsFormService.js';

const show = async (req, res) => {
	const {result: officers} = await officerService.getAllOfficersByPosition();
	const tableHeads = ['No', 'Tên đăng nhập', 'Chức vụ', 'Quận', 'Phường'];
	const tableData = officers.map((officer) => {
		return {
			username: officer.username,
			position: (officer.position === 1 ? 'Cán bộ Quận' : officer.position === 2 ? 'Cán bộ Phường' : 'Chưa phân công'),
			districtID: officer.districtID,
			district: officer.districtName || '',
			wardID: officer.wardID,
			ward: officer.wardName || '',
			isAssigned: officer.position !== 0,
			actions: {
				edit: true,
				remove: true,
				info: true,
			},
		};
	}).sort((a, b) => {
		if (a.isAssigned && !b.isAssigned) return 1;
		if (!a.isAssigned && b.isAssigned) return -1;
		return 0;
	});

	// console.log(tableData[4].districtID, tableData[4].wardID);

	const totalOfficers = tableData.length;
	const numberOfAssignedOfficers = tableData.filter((officer) => officer.isAssigned).length;

	const districts = await districtService.getAllDistricts();
	const wards = await wardService.getAllWards();

	res.render('./so/assign', {
		title: 'Sở - Phân công', tableHeads, tableData, toolbars: toolbars
		, totalOfficers, numberOfAssignedOfficers, districts, wards
	});
};

const deleteAccount = async (req, res) => {
	const username = req.params.username;
	if (username != null) {
		await officerService.deleteOfficerByUsername(username);
	}
	// res.redirect('/so/assign');
}

const getWards = async (req, res) => {
	const districtID = req.params.id;
	const wards = await wardService.getWardsOfDistrict(districtID);
	res.json(wards);
}


export default {show, deleteAccount, getWards};