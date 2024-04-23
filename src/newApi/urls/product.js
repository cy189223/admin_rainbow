const api = {
	list: ['GET', '/shop/products'],
	store: ['POST', '/shop/products'],
	show: ['GET', '/shop/products/{uuid}'],
	update: ['PATCH', '/shop/products/{uuid}'],
	update_all: ['PATCH', '/shop/products/{uuid}'],
	put_on: ['PATCH', '/shop/products/{uuid}'],
	put_off: ['PATCH', '/shop/products/{uuid}'],
	destory: ['DELETE', '/shop/products/{uuid}'],

	sku: {
		list: ['GET', '/skus'],
		batch_update: ['POST', '/skus/batch']
	}
}

module.exports = api
