import express from 'express';
const router = express.Router();

const toolbars = [
    { icon: 'bi bi-house-door-fill' , name: 'Trang chủ' , link:'/so', },
    { icon: 'bi bi-building-fill', name: 'Danh sách quận huyện' , link: '/so/qlquan' },
    { icon: 'bi bi-badge-ad-fill' , name: 'Loại hình quảng cáo' , link: '/so/lhqc' , },
    { icon: 'bi bi-chat-left-dots-fill' , name: 'Yêu cầu' , link:'/so/yeucau', },
    { icon: 'bi bi-journal-bookmark-fill' , name: 'Thống kê báo cáo' , link: '/so/baocao' , },
    { icon: 'bi bi-person-badge' , name:'Phân công', link: '/so/phancong' , }
  ];

router.get('/', (req, res) => {
  res.render('so/index', { title: 'Sở - Trang chủ', toolbars: toolbars });
});

router.get('/lhqc', (req, res) => {
  res.render('so/LoaihinhQC', { title: 'Sở - LHQC', toolbars: toolbars });
});

router.get('/htbc', (req, res) => {
  res.render('so/HinhthucBC', { title: 'Sở - HTBC', toolbars: toolbars });
});

router.get('/qlquan', (req, res) => {
  res.render('so/QLQuan', { title: 'Sở - QLQuan', toolbars: toolbars });
});

router.get('/qlphuong', (req, res) => {
  res.render('so/QLPhuong', { title: 'Sở - QLPhuong', toolbars: toolbars });
});

router.get('/yeucau', (req, res) => {
  res.render('so/YeucauCP', { title: 'Sở - YeucauCP', toolbars: toolbars });
});

router.get('/yeucau/cp', (req, res) => {
  res.render('so/YeucauCP', { title: 'Sở - YeucauCP', toolbars: toolbars });
});

router.get('/yeucau/cs', (req, res) => {
  res.render('so/YeucauCS', { title: 'Sở - YeucauCS', toolbars: toolbars });
});

router.get('/yeucau/:id', (req, res) => {
  res.render('so/ChiTietYeuCau', { title: 'Sở - ChiTietYeuCau', toolbars: toolbars });
});

router.get('/phancong', (req, res) => {
  res.render('so/Phancong', { title: 'Sở - Phancong', toolbars: toolbars });
});

router.get('/baocao/:id', (req, res) => {
  res.render('so/ChitietBC', { title: 'Sở - ChitietBC', toolbars: toolbars });
});

router.get('/baocao', (req, res) => {
  res.render('so/ThongKeBC', { title: 'Sở - ThongKeBC', toolbars: toolbars });
})

export default router;
