const api = {
	list: ['GET', '/users'],
	update: ['PATCH', '/users/{uuid}'],
	info: ['GET', '/admin'],
	login: ['POST', '/login/with-password'],
	export: ['POST', '/export/users'],
	update_options: ['PATCH', '/users/{uuid}']
}

module.exports = api
