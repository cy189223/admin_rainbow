const api = {
	list: ['GET', '/coupon-codes'],
	store: ['POST', '/coupon-codes'],
	update: ['PATCH', '/coupon-codes/{uuid}'],
	show: ['GET', '/coupon-codes/{uuid}'],
	destory: ['DELETE', '/coupon-codes/{uuid}'],
}

module.exports = api
