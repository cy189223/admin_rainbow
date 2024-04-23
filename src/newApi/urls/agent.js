const api = {
	record: {
		list: ['GET', '/agent-records'],
		update: ['PATCH', '/agent-records/{uuid}'],
		show: ['GET', '/agent-records/{uuid}'],
	},
	setting: {
		show: ['GET', '/agent/setting'],
		reset: ['PUT', '/agent/setting']
	} 
}

module.exports = api
