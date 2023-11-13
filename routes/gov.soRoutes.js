import express from 'express';
const router = express.Router();

const toolbars = [
    { icon: 'bi bi-house-door-fill' , name: 'Trang chủ' , link:'/so', },
    { icon: 'bi bi-building-fill', name: 'Danh sách quận huyện' , link: '/so/qlquan' },
    { icon: 'bi bi-geo-fill', name: 'Điểm đặt / bảng quảng cáo' , link: '/so/diemdat' },
    { icon: 'bi bi-badge-ad-fill' , name: 'Loại hình quảng cáo' , link: '/so/lhqc' , },
    { icon: 'bi bi-chat-left-dots-fill' , name: 'Yêu cầu' , link:'/so/yeucau', },
    { icon: 'bi bi-journal-bookmark-fill' , name: 'Thống kê báo cáo' , link: '/so/baocao' , },
    { icon: 'bi bi-person-badge' , name:'Phân công', link: '/so/phancong' , }
  ];

router.get('/', (req, res) => {
  res.render('so/index', { title: 'Sở - Trang chủ', toolbars: toolbars });
});

router.get('/lhqc', (req, res) => {
  res.render('so/LoaihinhQC', { title: 'Sở - Loại hình quảng cáo', toolbars: toolbars });
});

router.get('/htbc', (req, res) => {
  res.render('so/HinhthucBC', { title: 'Sở - Hình thức báo cáo', toolbars: toolbars });
});

router.get('/qlquan', (req, res) => {
  res.render('so/QLQuan', { title: 'Sở - Quản lý Quận', toolbars: toolbars });
});

router.get('/qlphuong', (req, res) => {
  res.render('so/QLPhuong', { title: 'Sở - Quản lý Phường', toolbars: toolbars });
});

router.get('/yeucau', (req, res) => {
  res.render('so/YeucauCP', { title: 'Sở - Yêu cầu cấp phép', toolbars: toolbars });
});

router.get('/yeucau/cp', (req, res) => {
  res.render('so/YeucauCP', { title: 'Sở - Yêu cầu cấp phép', toolbars: toolbars });
});

router.get('/yeucau/cs', (req, res) => {
  res.render('so/YeucauCS', { title: 'Sở - Yêu cầu chỉnh sửa', toolbars: toolbars });
});

router.get('/yeucau/:id', (req, res) => {
  res.render('so/ChiTietYeuCau', { title: 'Sở - Chi tiết yêu cầu', toolbars: toolbars, id: req.params.id });
});

router.get('/phancong', (req, res) => {
  res.render('so/Phancong', { title: 'Sở - Phân công', toolbars: toolbars });
});

router.get('/baocao/:id', (req, res) => {
  res.render('so/ChitietBC', { title: 'Sở - Chi tiết báo cáo', toolbars: toolbars, id: req.params.id  });
});

router.get('/baocao', (req, res) => {
  res.render('so/ThongKeBC', { title: 'Sở - Thống kê báo cáo', toolbars: toolbars });
})

router.get('/diemdat', (req, res) => {
  res.render('so/DiemDat', { title: 'Sở - Điểm đặt quảng cáo', toolbars: toolbars });
})

router.get('/bangquangcao', (req, res) => {
  res.render('so/BangQC', { title: 'Sở - Điểm đặt quảng cáo', toolbars: toolbars });
})

router.get('/diemdat/new', (req, res) => {
  res.render('so/ThemDiemDat', { title: 'Sở - Thêm điểm đặt quảng cáo', toolbars: toolbars });
})

router.get('/bangquangcao/new/:id', (req, res) => {
  res.render('so/ThemBangQC', { title: 'Sở - Thêm bảng quảng cáo', toolbars: toolbars });
})

export default router;
