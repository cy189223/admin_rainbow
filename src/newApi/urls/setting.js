const api = {
	shopBanner: {
		list: ['GET', '/setting/shop-banner'],
		update: ['PUT', '/setting/shop-banner']
	},
	userLevel: {
		list: ['GET', '/setting/user-level'],
		update: ['PUT', '/setting/user-level']
	}
}

module.exports = api
