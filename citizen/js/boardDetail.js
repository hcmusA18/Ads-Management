import { getDetailBoard } from "./request.js";

const urlParams = new URLSearchParams(window.location.search);
const boardID = urlParams.get('id');
let boardDetail = await getDetailBoard(boardID);
console.log(boardDetail);

const attachCarousels = async () => {
  const carousel = $("#carousel");
  carousel.empty();
  carousel.innerHTML = "";
  let innerCarousel = $(`
  <div class="row position-relative" id="mainImgContainer">
    <img id="mainImg" src="${boardDetail.image[0]}" class="img-fluid" alt="Current image">

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

  for (let i = 0; i < boardDetail.image.length; i++) {
    let imgHTML = $(`<div class="row thumbnails-item d-none mt-2"></div>`);
    // let childImgHTML = $(`<div class="col-4" onclick="changeMainImg(this.children[0])" style="cursor: pointer;"></div>`);
    for (let j = i; j < i + 3; j++) {
      imgHTML.append(`<div class="col-4" onclick="changeMainImg(this.children[0])" style="cursor: pointer;">
      <img src="${boardDetail.image[j % boardDetail.image.length]}" class="img-fluid" alt="Thumbnail ${j}" style="object-fit: cover; height: 10rem; width: 100%">
      </div>`);
    }
    carousel.append(imgHTML);
  }

  $(".thumbnails-item:first").removeClass("d-none");
  $(".thumbnails-item:not(.d-none) img:first").addClass("border border-primary");
}

attachCarousels();
// {
//   "_id": "6577e392b9f63faab623510c",
//   "boardID": "QC0006",
//   "spotID": "DD0008",
//   "height": 13,
//   "width": 7.5,
//   "quantity": 3,
//   "image": [
//       "https://drive.google.com/uc?export=view&id=1VDcBGaE7KToRdlc1pWccE112vaf8kfUk",
//       "https://drive.google.com/uc?export=view&id=1DdHY02Ga5qoh_cEhc2BK0_UL4H1SisaO"
//   ],
//   "spotAddress": "974 Trường Sa",
//   "authCompany": "Công ty Dược phẩm Quốc tế",
//   "authCompanyPhone": "0912 876 543",
//   "authCompanyEmail": "quocphatmcompany.info@gmail.com",
//   "authCompanyAddress": "806 Đ. Trần Hưng Đạo, Phường 7, Quận 5, Thành phố Hồ Chí Minh",
//   "startDate": "2023-06-30T00:00:00.000Z",
//   "endDate": "2024-06-30T00:00:00.000Z",
//   "boardTypeName": "Trụ treo băng rôn dọc",
//   "spotTypeName": "Chợ",
//   "adsFormName": "Xã hội hoá"
// }

const formater = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

$("#board-id").val(boardDetail.boardID);
$("#spot-id").val(boardDetail.spotID);
$("#address").val(boardDetail.spotAddress);
$("#auth-company").val(boardDetail.authCompany);
$("#auth-company-phone").val(boardDetail.authCompanyPhone);
$("#auth-company-email").val(boardDetail.authCompanyEmail);
$("#auth-company-address").val(boardDetail.authCompanyAddress);
$("#start-date").val(formater.format(new Date(boardDetail.startDate)));
$("#end-date").val(formater.format(new Date(boardDetail.endDate)));
$("#ads-type").val(boardDetail.adsFormName);
$("#quantity").val(`${boardDetail.quantity} trụ/bảng`);
$("#size").val(`${boardDetail.width} x ${boardDetail.height} m^2`);
$("#ads-form").val(boardDetail.adsFormName);
$("#location-type").val(boardDetail.spotTypeName);
