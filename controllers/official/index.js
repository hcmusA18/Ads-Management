import adsController from './adsController.js';
import licenseController from './licenseController.js';
import reportsController from './reportsController.js';
import infoController from './infoController.js';
import {createToolbar} from './utilities.js';

const indexController = {
	show: (req, res) => {
		const role = String(req.originalUrl.split('/')[1]);
		res.render('official/index', {title: `${role === 'quan' ? 'Quận' : 'Phường'} - Trang chủ`, toolbars: createToolbar(role)});
	}

}

export default {
	adsController,
	indexController,
	licenseController,
	reportsController,
  infoController
}
