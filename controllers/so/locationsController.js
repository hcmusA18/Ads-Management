import {toolbars} from './utilities.js';
import * as districtService from '../../services/districtService.js'
import * as wardService from '../../services/wardService.js';
import * as spotService from '../../services/spotService.js';
import * as boardService from '../../services/boardService.js';

const controller = {};

controller.findAllDistricts = async (req, res) => {
    const districts = await districtService.getAllDistricts();
    const wardsCnt = await wardService.countAll();
    const boardCnt = await boardService.countAll();
    const spotCnt = await spotService.countAll();
    console.log(districts);
    const inputs = {
        title: 'Sở - Quản lý Quận',
        toolbars: toolbars,
        districts: districts,
        wardsCnt: wardsCnt,
        boardCnt: boardCnt,
        spotCnt: spotCnt,
    };
    return res.render('./so/locations', inputs);
};


export default controller;