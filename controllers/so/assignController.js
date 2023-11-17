import {toolbars} from './utilities.js';

const show = (req, res) => {
	res.render('./so/assign', {title: 'Sở - Phân công', toolbars: toolbars});
}

export default {show};