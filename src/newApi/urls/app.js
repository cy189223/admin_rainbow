const api = {
	solution: {
		store: ['POST', '/solutions']
	},
	customArea: {
		list: ['GET', '/custom-areas'],
		update: ['PUT', '/custom-areas']
	},
	setting: {
		clockIn: {
			show: ['GET', '/setting/clock-in'],
			update: ['PUT', '/setting/clock-in']
		}
	}
}

module.exports = api
