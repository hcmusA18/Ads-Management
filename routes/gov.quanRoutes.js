import express from 'express';
const router = express.Router();

const toolbars=[ 
  { icon: 'bi bi-house-door-fill' , name: 'Trang chủ' , link:'/quan', }, 
  { icon: 'bi bi-geo-fill', name: 'Điểm đặt quảng cáo' , link: '/quan/diemdat' }, 
  { icon: 'bi bi-badge-ad-fill', name: 'Bảng quảng cáo' , link: '/quan/bangquangcao' },
  { icon: 'bi bi-file-earmark-text-fill' ,name: 'Báo cáo vi phạm' , link: '/quan/baocao' }, 
  { icon: 'bi bi-chat-left-dots-fill' , name: 'Yêu cầu cấp phép' ,link: '/quan/yeucau/cp' , }, 
]

router.get('/', (req, res) => {
  res.render('quan/index', { title: 'Quận - Trang chủ', toolbars: toolbars });
});

router.get('/baocao', (req, res) => {
  res.render('quan/BaoCao', { title: 'Quận - Báo cáo', toolbars: toolbars });
});

router.get('/diemdat', (req, res) => {
  res.render('quan/Diemdat', { title: 'Quận - Điểm đặt', toolbars: toolbars });
})

router.get('/bangquangcao', (req, res) => {
  res.render('quan/BangQC', { title: 'Quận - Bảng Quảng cáo', toolbars: toolbars });
})

router.get('/yeucau/cp', (req, res) => {
  res.render('quan/YeuCauCP', { title: 'Quận - Yêu cầu cấp phép', toolbars: toolbars });
})

router.get('/yeucau/cp/:id', (req, res) => {
  res.render('quan/ChitietYeuCauCP', { title: 'Quận - Chi tiết yêu cầu cấp phép', toolbars: toolbars });
})

router.get('/yeucau/cp-new/', (req, res) => {
  res.render('quan/TaoYeuCauCP', { title: 'Quận - Tạo yêu cầu cấp phép', toolbars: toolbars });
})

router.get('/diemdat/:id', (req, res) => {
  res.render('quan/ChitietDiemDat', { title: 'Quận - Chi tiết điểm đặt', toolbars: toolbars });
})

router.get('/bangquangcao/:id', (req, res) => {
  res.render('quan/ChitietBangQC', { title: 'Quận - Chi tiết bảng quảng cáo', toolbars: toolbars });
})

router.get('/yeucau/cs/diemdat/:id', (req, res) => {
  res.render('quan/YeuCauCS-diem', { title: 'Quận - Yêu cầu chỉnh sửa điểm đặt', toolbars: toolbars });
})

router.get('/yeucau/cs/bangquangcao/:id', (req, res) => {
  res.render('quan/YeuCauCS-bang', { title: 'Quận - Yêu cầu chỉnh sửa bảng quảng cáo', toolbars: toolbars });
})

router.get('/baocao/:id', (req, res) => {
  res.render('quan/ChitietBC', { title: 'Quận - Chi tiết báo cáo', toolbars: toolbars });
})

export default router;
