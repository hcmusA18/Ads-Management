import { toolbars } from './utilities.js'
import * as districtService from '../../services/districtService.js'
import * as wardService from '../../services/wardService.js'
import * as spotService from '../../services/spotService.js'
import * as boardService from '../../services/boardService.js'

const controller = {}

controller.findAllDistricts = async (req, res) => {
  const districts = await districtService.getAllDistricts();
  const wardsCnt = await wardService.countAll();
  const boardCnt = await boardService.countAll();
  const spotCnt = await spotService.countAll();

  // Fetch counts for each district concurrently
  const specificDistrictsData = {};
  await Promise.all(
    districts.map(async (district) => {
      const [wardsCnt, boardCnt, spotCnt] = await Promise.all([
        wardService.countAllOfDistrict(district.districtID),
        boardService.countAllOfDistrict(district.districtID),
        spotService.countAllOfDistrict(district.districtID),
      ]);

      specificDistrictsData[district.districtID] = {
        wardsCnt,
        boardCnt,
        spotCnt,
      };
    })
  );

  // console.log(specificDistrictsData);

  const inputs = {
    title: 'Sở - Quản lý Quận',
    toolbars: toolbars,
    districts: districts,
    wardsCnt: wardsCnt,
    boardCnt: boardCnt,
    spotCnt: spotCnt,
    details: specificDistrictsData,
  }
  return res.render('./so/locations', inputs)
}

controller.locationsDetails = async (req, res) => {
  let districtID = req.query.quan;
  
  // const {NoWards, NoBoards, NoSpots, listOfDistricts, listOfWards} = await Promise.all([
  //   wardService.countAll(),
  //   boardService.countAll(),
  //   spotService.countAll(),
  //   districtService.getAllDistricts(),
  //   wardService.getWardsOfDistrict(districtID),
  // ]);

  const data = {
    toolbars: toolbars,
    title: 'Sở - Quản lý Phường',
    NoWards: await wardService.countAll(),
    NoBoards: await boardService.countAll(),
    NoSpots: await spotService.countAll(),
    listOfDistricts: await districtService.getAllDistricts(),
    listOfWards: await wardService.getWardsOfDistrict(districtID),
  }

  const details = {};

  const promises = data.listOfWards.map(async (ward) => {
    const [boardCnt, spotCnt] = [
      await boardService.countByWard(ward.wardID),
      await spotService.countByWard(ward.wardID),
    ];
    
    details[ward.wardID] = {
      boardCnt,
      spotCnt,
    };
  });

  await Promise.all(promises);
  data.details = details;
  // console.log(listOfDistricts);

  // const data = {
  //   toolbars: toolbars,
  //   title: 'Sở - Quản lý Phường',
  //   NoWards: NoWards,
  //   NoBoards: NoBoards,
  //   NoSpots: NoSpots,
  //   listOfDistricts: listOfDistricts,
  //   listOfWards: listOfWards,
  //   details: details, 
  // }
  res.render('./so/location-detail', data);
};

export default controller
