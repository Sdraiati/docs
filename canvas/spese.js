class Spese {
	constructor(name) {
		this.name = name
	}

	// 0: date
	// 1: amount
	// 2: tag
	// 3: description
	//fromCSV(csv) {
	//	this.data = csv.split('\n').map(line => line.split(','))
	//	return this
	//}

	fromPoints(points) {
		this.data = points
		for (let i = 1; i < points.length; i++) {
			this.data[i][1] += this.data[i - 1][1]
		}
		return this
	}

	toPoints() {
		let min = this.getMin()
		if (min < 0) {
			for (let i = 0; i < this.data.length; i++) {
				this.data[i][1] -= min
			}
		}

		let max = this.getMax()
		let raw_pts = this.data.map((line, i) => {
			return [i / (this.data.length - 1), line[1] / max]
		})

		let pts = []
		let i = 0
		const current_date = new Date()
		const starting_date = new Date(this.data[0][0])
		while (starting_date < current_date) {
			if (this.data[i][0] === starting_date.toISOString().slice(0, 10)) {
				i++
			}
			pts.push(raw_pts[i])
		}
		return (pts, this.data[0][0])
	}

	getMax() {
		return Math.max(...this.data.map(line => line[1]))
	}

	getMin() {
		return Math.min(...this.data.map(line => line[1]))
	}
}

export default Spese
