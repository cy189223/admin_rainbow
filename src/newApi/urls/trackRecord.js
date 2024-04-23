const api = {
	list: ['GET', '/track-records'],
	update: ['PATCH', '/track-records/{uuid}'],
	store: ['POST', '/track-records'],
	show: ['GET', '/track-records/{uuid}'],
	destory: ['DELETE', '/track-records/{uuid}'],
	reply: ['PATCH', '/track-records/{uuid}']
}

module.exports = api
