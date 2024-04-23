const api = {
	list: ['GET', '/service'],
	update: ['PATCH', '/service/{uuid}'],
	show: ['GET', '/service/{uuid}'],
	stock: {
		list: ['GET', '/service-stock/{uuid}'],
		update_stock: ['PATCH', '/service-stock/{uuid}']
	},
	order: {
		list: ['GET', '/service-orders'],
		update: ['PATCH', '/service-orders/{uuid}'],
		total_stat: ['GET', '/service-order-stat/total'],
		update_seller_remark: ['PATCH', '/service-orders/{uuid}'],
		update_address: ['PATCH', '/service-orders/{uuid}'],

		confirm_doctor: ['PATCH', '/service-orders/{uuid}'],
		complete_service: ['PATCH', '/service-orders/{uuid}'],

		express: {
			list: ['GET', '/express-list']
		}
	}
}

module.exports = api
