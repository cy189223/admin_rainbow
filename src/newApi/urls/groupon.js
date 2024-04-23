const api = {
	list: ['GET', '/groupons'],
	store: ['POST', '/groupons'],
	update: ['PATCH', '/groupons/{uuid}'],
	show: ['GET', '/groupons/{uuid}'],
	destory: ['DELETE', '/groupons/{uuid}'],
	close: ['PATCH', '/groupons/{uuid}'],

	record: {
		list: ['GET', '/groupon-records'],
		show: ['GET', '/groupon-records/{uuid}'],
		total_stat: ['GET', '/groupon-record-stat/total']
	}
}

module.exports = api
