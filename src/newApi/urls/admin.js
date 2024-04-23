const api = {
	list: ['GET', '/admins'],
	update: ['PATCH', '/admins/{uuid}'],
	store: ['POST', '/admins'],
	destory: ['DELETE', '/admins/{uuid}'],
	role: {
		list: ['GET', '/admin-roles'],
		update: ['PATCH', '/admin-roles/{uuid}'],
		store: ['POST', '/admin-roles'],
		destory: ['DELETE', '/admin-roles/{uuid}'],
	}
	// permission: {
	// 	list: 
	// }
}

module.exports = api
