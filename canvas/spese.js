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
		let max = this.getMax()
		return this.data.map((line, i) => {
			return [i / (this.data.length - 1), line[1] / max]
		})
	}

	getMax() {
		return Math.max(...this.data.map(line => line[1]))
	}
}

export default Spese
