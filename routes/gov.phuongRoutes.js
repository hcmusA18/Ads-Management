import express from 'express';
const router = express.Router();

const toolbars=[ { icon: 'bi bi-house-door-fill' , name: 'Trang chủ' , link:'/phuong', }, 
{ icon: 'bi bi-geo-fill', name: 'Điểm đặt / bảng quảng cáo' , link: '/phuong/diemdat' }, 
{ icon: 'bi bi-file-earmark-text-fill' ,name: 'Xử lý báo cáo' , link: '/phuong/baocao' , }, 
{ icon: 'bi bi-chat-left-dots-fill' , name: 'Yêu cầu cấp phép' , link: '/phuong/yeucau' , }, ]

router.get('/', (req, res) => {
  res.render('phuong/index', { title: 'Phường - Trang chủ' });
});

router.get('/diemdat', (req, res) => {
  res.render('phuong/DiemDatQuangCao/DiemDat', { title: 'Phường - Danh sách Điểm/Bảng QC', toolbars: toolbars});
})

router.get('/diemdat/:id', (req, res) => {
  res.render('phuong/DiemDatQuangCao/ChiTietDiemDat', { title: 'Phường - Chi tiết điểm đặt', toolbars: toolbars});
})

router.get('/bangquangcao', (req, res) => {
  res.render('phuong/BangQuangCao/BangQC', { title: 'Phường - Chi tiết cbng Quảng cáo', toolbars: toolbars});
})

router.get('/bangquangcao/:id', (req, res) => {
  res.render('phuong/BangQuangCao/ChiTietBangQC', { title: 'Phường - Chi tiết cbng Quảng cáo', toolbars: toolbars});
})

router.get('/baocao', (req, res) => {
  res.render('phuong/BaoCao/Baocao', { title: 'Phường - Báo cáo', toolbars: toolbars });
});

router.get('/baocao/:id', (req, res) => {
  res.render('phuong/BaoCao/ChitietBC', { title: 'Phường - Chi tiết báo cáo', toolbars: toolbars });
})


export default router;
