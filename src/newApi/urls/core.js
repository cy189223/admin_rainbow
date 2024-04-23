const api = {
	withdrawRecord: {
		list: ['GET', '/withdraw-records'],
		complete: ['PATCH', '/withdraw-records/{uuid}'],
		set_remark: ['PATCH', '/withdraw-records/{uuid}']
	},
	push: {
		show: ['GET', '/push-records/{uuid}'],
		list: ['GET', '/push-records'],
		store: ['POST', '/push-records'],
		destory: ['DELETE', '/push-records/{uuid}']
	}
}

module.exports = api
