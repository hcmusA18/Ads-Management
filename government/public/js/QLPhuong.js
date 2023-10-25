$(document).ready(function(){
    
    const queryParams = new URLSearchParams(window.location.search);
    // console.log(searchParams.get('quan'));

    const districtData = {
        "Q001": {
            districtName: "Quận 1",
            wards: [
                {wardID: "P0101", wardName: "Phường 1", numOfAdsSpots: 15, numOfAdsPanels: 21},
                {wardID: "P0201", wardName: "Phường 2", numOfAdsSpots: 23, numOfAdsPanels: 22},
                {wardID: "P0301", wardName: "Phường 3", numOfAdsSpots: 41, numOfAdsPanels: 23},
                {wardID: "P0401", wardName: "Phường 4", numOfAdsSpots: 12, numOfAdsPanels: 24},
                {wardID: "P0501", wardName: "Phường 5", numOfAdsSpots: 11, numOfAdsPanels: 25},
                {wardID: "P0601", wardName: "Phường 6", numOfAdsSpots: 10, numOfAdsPanels: 26},
                {wardID: "P0701", wardName: "Phường 7", numOfAdsSpots: 13, numOfAdsPanels: 27},
                {wardID: "P0801", wardName: "Phường 8", numOfAdsSpots: 63, numOfAdsPanels: 28},
                {wardID: "PBN01", wardName: "Phường Bến Nghé", numOfAdsSpots: 12, numOfAdsPanels: 13},
                {wardID: "POL01", wardName: "Phường Cấu Ông Lãnh", numOfAdsSpots: 33, numOfAdsPanels: 46},
                {wardID: "PDK01", wardName: "Phường Đa Kao", numOfAdsSpots: 14, numOfAdsPanels: 29},
                {wardID: "PCG01", wardName: "Phường Cô Giang", numOfAdsSpots: 25, numOfAdsPanels: 44},
            ]
        },
        "Q006": {
            districtName: "Quận 6",
            wards: [
                {wardID: "P0106", wardName: "Phường 1", numOfAdsSpots: 15, numOfAdsPanels: 21},
                {wardID: "P0206", wardName: "Phường 2", numOfAdsSpots: 23, numOfAdsPanels: 22},
                {wardID: "P0306", wardName: "Phường 3", numOfAdsSpots: 41, numOfAdsPanels: 23},
                {wardID: "P0406", wardName: "Phường 4", numOfAdsSpots: 12, numOfAdsPanels: 24},
                {wardID: "P0506", wardName: "Phường 5", numOfAdsSpots: 11, numOfAdsPanels: 25},
                {wardID: "P0606", wardName: "Phường 6", numOfAdsSpots: 10, numOfAdsPanels: 26},
                {wardID: "P0706", wardName: "Phường 7", numOfAdsSpots: 13, numOfAdsPanels: 27},
                {wardID: "P0806", wardName: "Phường 8", numOfAdsSpots: 63, numOfAdsPanels: 28},
                {wardID: "P0906", wardName: "Phường 9", numOfAdsSpots: 12, numOfAdsPanels: 13},
                {wardID: "P1006", wardName: "Phường 10", numOfAdsSpots: 33, numOfAdsPanels: 46},
                {wardID: "P1106", wardName: "Phường 11", numOfAdsSpots: 14, numOfAdsPanels: 29},
                {wardID: "P1206", wardName: "Phường 12", numOfAdsSpots: 25, numOfAdsPanels: 44},
            ]
        },
        "QBTH": {
            districtName: "Quận Bình Thạnh",
            wards: [
                {wardID: "P01BT", wardName: "Phường 1", numOfAdsSpots: 15, numOfAdsPanels: 21},
                {wardID: "P02BT", wardName: "Phường 2", numOfAdsSpots: 23, numOfAdsPanels: 22},
                {wardID: "P03BT", wardName: "Phường 3", numOfAdsSpots: 41, numOfAdsPanels: 23},
                {wardID: "P04BT", wardName: "Phường 4", numOfAdsSpots: 12, numOfAdsPanels: 24},
                {wardID: "P05BT", wardName: "Phường 5", numOfAdsSpots: 11, numOfAdsPanels: 25},
                {wardID: "P06BT", wardName: "Phường 6", numOfAdsSpots: 10, numOfAdsPanels: 26},
                {wardID: "P23BT", wardName: "Phường 23", numOfAdsSpots: 13, numOfAdsPanels: 27},
                {wardID: "P24BT", wardName: "Phường 24", numOfAdsSpots: 63, numOfAdsPanels: 28},
                {wardID: "P25BT", wardName: "Phường 25", numOfAdsSpots: 12, numOfAdsPanels: 13},
                {wardID: "P26BT", wardName: "Phường 26", numOfAdsSpots: 33, numOfAdsPanels: 46},
                {wardID: "P27BT", wardName: "Phường 27", numOfAdsSpots: 14, numOfAdsPanels: 29},
                {wardID: "P28BT", wardName: "Phường 28", numOfAdsSpots: 25, numOfAdsPanels: 44},
            ]
        },
    };

    const districtID = queryParams.get('quan');
    // console.log(typeof districtID, districtID);
    // console.log(districtData);
    const districtInfo = districtData[districtID];
    // console.log(districtInfo.districtName);
    const block = $("#wardData");

    block.empty();

    districtInfo.wards.forEach(function(ward){
        const item = $(`
            <tr>
                <td>
                    <a data-bs-toggle="modal" data-bs-target="#editModal-qlquan" style="background-color: #00000000;  display: block;">
                        ${ward.wardID}
                    </a>
                </td>
                <td>
                    <a data-bs-toggle="modal" data-bs-target="#editModal-qlquan" style="background-color: #00000000;  display: block;">
                        ${ward.wardName}
                    </a>
                </td>
                <td>
                    <a data-bs-toggle="modal" data-bs-target="#editModal-qlquan" style="background-color: #00000000;  display: block;">
                        ${districtInfo.districtName}
                    </a>
                </td>
                <td>
                    <a data-bs-toggle="modal" data-bs-target="#editModal-qlquan" style="background-color: #00000000;  display: block;">
                        ${ward.numOfAdsSpots}
                    </a>
                </td>
                <td>
                    <a data-bs-toggle="modal" data-bs-target="#editModal-qlquan" style="background-color: #00000000;  display: block;">
                        ${ward.numOfAdsPanels}
                    </a>
                </td>
            </tr>
        `);

        block.append(item);
    });
});