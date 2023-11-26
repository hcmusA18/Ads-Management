import {toolbars} from './utilities.js';
import officerService from '../../services/officerService.js';

const show = async (req, res) => {
	const {result: officers} = await officerService.getAllOfficersByPosition();
	const tableHeads = ['No', 'Tên đăng nhập', 'Chức vụ', 'Quận', 'Phường'];
	const tableData = officers.map((officer) => {
		return {
			username: officer.username,
			position: (officer.position === 1 ? 'Cán bộ Quận' : officer.position === 2 ? 'Cán bộ Phường' : 'Chưa phân công'),
			district: officer.districtName || '',
			ward: officer.wardName || '',
			isAssigned: officer.position !== 0,
			actions: {
				edit: true,
				remove: true,
				info: true
			}
		}
	}).sort((a, b) => {
		if (a.isAssigned && !b.isAssigned) return 1;
		if (!a.isAssigned && b.isAssigned) return -1;
		return 0;
	});
	res.render('./so/assign', {title: 'Sở - Phân công', tableHeads, tableData, toolbars: toolbars});
}

export default {show};