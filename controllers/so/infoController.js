import officerService from '../../services/officerService.js';
import { getDistrictByID } from '../../services/districtService.js';
import { getWardByID } from '../../services/wardService.js';
import {toolbars} from './utilities.js';

const getOfficierRoleInfor = async (info) => {
  let wardName = null;
  let districtName = null;
  let roleName = null;
  switch (info.position) {
    case 2:
      roleName = 'Cán bộ Phường';
      [wardName, districtName] = await Promise.all([ getWardByID(info.wardID), getDistrictByID(info.districtID) ]);
      [wardName, districtName] = [wardName.wardName, districtName.districtName];
      break;
    case 1:
      roleName = 'Cán bộ Quận';
      districtName = await getDistrictByID(info.districtID);
      districtName = districtName.districtName;
      break;
    case -1:
      roleName = 'Cán bộ Sở';
      break;
    default:
      break;
  }
  return { wardName, districtName, roleName };
}

const getInfo = async (req, res) => {
  const { username } = req.params;
  const role = String(req.originalUrl.split('/')[1]);
  res.locals.role = role;
  try {
    const info = await officerService.getOfficerByUsername(username, true);
    const { wardName, districtName, roleName } = await getOfficierRoleInfor(info);
    if (wardName) info.managePlace = `Phường ${wardName}, Quận ${districtName}`;
    else if (districtName) info.managePlace = `Quận ${districtName}`;
    else info.managePlace = 'Sở Văn hóa Thể thao và Du lịch';
    info.roleName = roleName;
    res.render('info', { title: 'Thông tin', info: info, toolbars: toolbars });
  } catch {
    res.render('error', { message: 'Không tìm thấy thông tin' })
  }
}

const updateInfo = async (req, res) => {
  const { username } = req.params;
  const { name, email, phone, dob } = req.body;
  try {
    await officerService.updateOfficer(username, { name, email, phone, dob });
    res.status(200).json({ message: 'Cập nhật thông tin thành công' });
  } catch {
    res.status(500).json({ message: 'Cập nhật thông tin thất bại' })
  }
}

export default {
  getInfo,
  updateInfo
}
