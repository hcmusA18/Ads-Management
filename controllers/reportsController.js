function createToolbar(role) {
    return [
        {icon: 'bi bi-house-door-fill', name: 'Trang chủ', link: `/${role}`,},
        {icon: 'bi bi-geo-fill', name: 'Điểm đặt quảng cáo', link: `/${role}/ads?category=spot`},
        {icon: 'bi bi-badge-ad-fill', name: 'Bảng quảng cáo', link: `/${role}/ads?category=board`},
        {icon: 'bi bi-file-earmark-text-fill', name: 'Xử lý báo cáo', link: `/${role}/reports`},
        {icon: 'bi bi-chat-left-dots-fill', name: 'Yêu cầu cấp phép', link: `/${role}/license`}
    ]
}

const show = (req, res) => {
	const role = req.originalUrl.split('/')[1];
	let title = ' - Quản lí Báo cáo vi phạm';
	const roleData = {
		quan: {
			tableHeads: ['ID Báo Cáo', 'ID DD / QC', 'Loại hình báo cáo', 'Phường'
            , 'Họ tên người gửi', 'Email', 'Thời điểm gửi', 'Trạng thái'],
			tableData: [...Array(55).keys()].map(i => {
				return {
					id: 'BC' + String(i + 1).padStart(5, '0'),
					objectID: 'DD' + String(i + 1).padStart(5, '0'),
					reportType: 'Tố giác sai phạm',
                    ward: `Phường ${(i + 1) % 13}`,
					reporterName: 'Nguyễn Công Khanh',
                    reporterEmail: 'abcxyz@gmail.com',
					sendTime: '01/01/2021',
					state: Math.random() > 0.667 ? 'Chưa xử lý' : (Math.random() > 0.333? 'Đang xử lý' : 'Đã xử lý'),
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}
			}),
			checkboxData: [...Array(13).keys()].map(i => `Phường ${i + 1}`),
			checkboxHeader: 'QUẬN 2',
		},
		phuong: {
			tableHeads: ['ID Báo Cáo', 'ID DD / QC', 'Loại hình báo cáo', 
            'Họ tên người gửi', 'Email', 'Thời điểm gửi', 'Trạng thái'],
			tableData: [...Array(55).keys()].map(i => {
				return {
					id: 'BC' + String(i + 1).padStart(5, '0'),
					objectID: 'DD' + String(i + 1).padStart(5, '0'),
					reportType: 'Tố giác sai phạm',
					reporterName: 'Nguyễn Công Khanh',
                    reporterEmail: 'abcxyz@gmail.com',
					sendTime: '01/01/2021',
					state: Math.random() > 0.667 ? 'Chưa xử lý' : (Math.random() > 0.333? 'Đang xử lý' : 'Đã xử lý'),
					actions: {
						edit: false,
						remove: false,
						info: true
					}
				}
			}),
		},
	}

	const roleInfo = roleData[role];
	if (!roleInfo) {
		res.status(404);
		return res.render('error', {error: {status: 404, message: 'Không tìm thấy trang'}});
	}
	title = (role == 'quan' ? 'Quận' : 'Phường') + title;
	res.render('reports', {url: req.originalUrl, title: title, ...roleInfo, toolbars: createToolbar(role)});
}

const showDetail = (req, res) => {
	const role = req.originalUrl.split('/')[1];
    let title = 'Chi tiết báo cáo vi phạm';
	title = (role == 'quan' ? 'Quận' : 'Phường') + title;

	const data = {
		id: 'BC' + String(Math.floor(Math.random() * 100000)).padStart(5, '0'),
		phone: '091388294',
		state: 1,
		objectID: 'QC00004',
		reportType: 'Tố giác vi phạm',
		sendTime: '01-01-2024',
		name: 'Nguyễn Công Khanh',
		email: 'abcxyz@gmail.com',
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eaque ipsa ut, possimus repellat, sint iure dolor libero, voluptatibus non incidunt atque. Quae neque nostrum fugit ad quia incidunt doloribus!',
		solution: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa quod perspiciatis numquam soluta adipisci aperiam magni? Iure laborum esse aperiam totam, laboriosam voluptatibus neque perferendis quas fugit voluptatem laudantium expedita. Natus veritatis illo harum voluptas deleniti, voluptate possimus hic eveniet itaque sunt dolor adipisci corporis? Quisquam perferendis exercitationem quas. Ab.',
		imgUrls: [
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%201',
			'https://placeholder.pics/svg/600x400/DEDEDE/555555/Image%202'
		],
	}
    res.render('report-detail', {role, title, toolbars: createToolbar(role), ...data});
}

export default {
	show,
	showDetail,
};