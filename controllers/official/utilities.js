export const createToolbar = (role) => {
	return [
		{icon: 'bi bi-house-door-fill', name: 'Trang chủ', link: `/${role}`,},
		{icon: 'bi bi-geo-fill', name: 'Điểm đặt quảng cáo', link: `/${role}/ads?category=spot`},
		{icon: 'bi bi-badge-ad-fill', name: 'Bảng quảng cáo', link: `/${role}/ads?category=board`},
		{icon: 'bi bi-file-earmark-text-fill', name: 'Xử lý báo cáo', link: `/${role}/reports`},
		{icon: 'bi bi-chat-left-dots-fill', name: 'Yêu cầu cấp phép', link: `/${role}/license`}
	]
}