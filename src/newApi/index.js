import { axios } from '../utils/request.js'

import importAll from './importAll.js'
const urls = importAll(require.context('./urls', true, /\.js$/))

const api = {
	emit (path, uuid = false, bodyParam = {}) {
		let action = path.split('.')

		let arr = urls;

		for (var i = 0; i < action.length; i ++) {
			arr = arr[action[i]]
		}

		action = action[action.length - 1]

		const method = arr[0]
		let url = arr[1]

		if (typeof (uuid) === 'object') {
			bodyParam = uuid
			uuid = false
		}

		if (uuid) {
			url = url.replace('{uuid}', uuid)

			// update里参数处理
			if (method === 'PUT' || method === 'PATCH') {
				if (action === 'update' || action === 'update_all') {
					bodyParam = {
						type: action,
						attributes: bodyParam
					}
				}
				else {
					bodyParam = {
						type: action,
						...bodyParam
					}
				}
			}
		}
		else {
			if (action === 'batch_update') {
				bodyParam = {
					type: 'update',
					list: bodyParam
				}
			}
		}

		console.log(url, method, bodyParam)

		let params = method === 'GET' ? {
			params: bodyParam
		} : {
			data: bodyParam
		}

		return axios({
			url: url,
			method: method,
			...params
		})
	}
}

export default api
