const api = {
	list: ['GET', '/doctors'],
	update: ['PATCH', '/doctors/{uuid}'],
	store: ['POST', '/doctors'],
	show: ['GET', '/doctors/{uuid}'],
	destory: ['DELETE', '/doctors/{uuid}']
}

module.exports = api
