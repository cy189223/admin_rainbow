const api = {
	list: ['GET', '/shop/categories'],
	store: ['POST', '/shop/categories'],
	update: ['PATCH', '/shop/categories/{uuid}'],
	destory: ['DELETE', '/shop/categories/{uuid}'],
}

module.exports = api
