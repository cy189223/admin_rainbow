const api = {
	list: ['GET', '/coupons'],
	store: ['POST', '/coupons'],
	update: ['PATCH', '/coupons/{uuid}'],
	show: ['GET', '/coupons/{uuid}'],
	destory: ['DELETE', '/coupons/{uuid}'],
	put_on: ['PATCH', '/coupons/{uuid}'],
	put_off: ['PATCH', '/coupons/{uuid}'],
}

module.exports = api
