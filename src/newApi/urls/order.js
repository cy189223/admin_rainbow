const api = {
	list: ['GET', '/orders'],
	update: ['PATCH', '/orders/{uuid}'],
	total_stat: ['GET', '/order-stat/total'],
	update_seller_remark: ['PATCH', '/orders/{uuid}'],
	update_address: ['PATCH', '/orders/{uuid}'],
	deliver: ['PATCH', '/orders/{uuid}'],

	express: {
		list: ['GET', '/express-list']
	},
	export: ['POST', '/export/orders']
}

module.exports = api
