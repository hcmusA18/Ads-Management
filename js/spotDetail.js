import { getDetailSpot } from "/js/request.js";

const urlParams = new URLSearchParams(window.location.search);
const reportID = urlParams.get('id');
let spotDetail = await getDetailSpot(reportID);
spotDetail = spotDetail[0];
const attachCarousels = async () => {

  console.log(spotDetail);
  const carousel = $("#carousel");
  carousel.empty();
  carousel.innerHTML = "";
  let innerCarousel = $(`
  <div class="row position-relative" id="mainImgContainer">
    <img id="mainImg" src="${spotDetail.spotImage[0]}" class="img-fluid" alt="Current image">

  <!--Thumbnails button-->
    <div class="col-12 position-absolute my-auto d-flex justify-content-between h-100">
      <button type="button" class="btn border-0" onclick="moveSlides('left')">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button type="button" class="btn border-0" onclick="moveSlides('right')">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>

  </div>`);

  carousel.append(innerCarousel);

  for (let i = 0; i < spotDetail.spotImage.length; i++) {
    let imgHTML = $(`<div class="row thumbnails-item d-none mt-2"></div>`);
    // let childImgHTML = $(`<div class="col-4" onclick="changeMainImg(this.children[0])" style="cursor: pointer;"></div>`);
    for (let j = i; j < i + 3; j++) {
      imgHTML.append(`<div class="col-4" onclick="changeMainImg(this.children[0])" style="cursor: pointer;">
      <img src="${spotDetail.spotImage[j % spotDetail.spotImage.length]}" class="img-fluid" alt="Thumbnail ${j}" style="object-fit: cover; height: 10rem; width: 100%">
      </div>`);
    }
    carousel.append(imgHTML);
  }

  $(".thumbnails-item:first").removeClass("d-none");
  $(".thumbnails-item:not(.d-none) img:first").addClass("border border-primary");
}

attachCarousels();

$("#spot-name").text(spotDetail.spotName);
$("#spot-id").val(spotDetail.spotID);

let [address, ward, district] = spotDetail.address.split(",");
ward = ward.replace("Phường", "").trim();
district = district.replace("Quận", "").trim();

$("#address").val(address);
$("#ward").val(ward);
$("#district").val(district);
$("#spot-type").val(spotDetail.spotTypeName);
$("#ads-type").val(spotDetail.adsFormName);
$("#status").val(spotDetail.status === 1 ? "Đã xử lý" : "Chờ xử lý");
const table = $("#table");
const boardData = spotDetail.boards.map((board) => ({
  id: board.boardID,
  ward: board.wardName,
  type: board.boardType,
  size: `${board.boardSize} m<sup>2</sup>`,
  quantity: `${board.quantity} trụ/bảng`,
  detail: `
		<div class="d-flex flex-row align-items-center justify-content-center">
      <a href="./board-detail.html?id=${board.boardID}">
        <img src="./assets/info.svg" alt="edit-icon" style="background-color: transparent"/>
      </a>
    </div>
		`
}));
table.bootstrapTable("load", boardData);
