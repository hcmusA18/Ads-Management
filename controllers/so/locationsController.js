import { toolbars } from './utilities.js'
import * as districtService from '../../services/districtService.js'
import * as wardService from '../../services/wardService.js'
import * as spotService from '../../services/spotService.js'
import * as boardService from '../../services/boardService.js'

const controller = {}

controller.findAllDistricts = async (req, res) => {
  const districts = await districtService.getAllDistricts()
  const wardsCnt = await wardService.countAll()
  const boardCnt = await boardService.countAll()
  const spotCnt = await spotService.countAll()

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

  console.log(specificDistrictsData);

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

export default controller
