import { Chart } from './chart.js'

Chart.prototype.setMax = function(max) {
	this.max = max
}

Chart.prototype.setMin = function(min) {
	this.min = min
}

/**
	* # draw the decorations
	* @param {string} color - color of the decorations
	* @param {number} width - width of the decorations
	* @param {array} yHeights - array of y heights
	*/
Chart.prototype.decorations = function(color = 'grey', width = 1, yHeights = [1, 2 / 3, 1 / 3]) {
	yHeights.forEach((height) => {
		let y = [[0, height], [1, height]]
		this.lines(y, [], color, width)
	});

	if (this.min >= 0) {
		yHeights.forEach((height) => {
			this.text(Math.floor(this.max * height), 0, height, color)
		})
	} else {
		yHeights.forEach((height) => {
			this.text(Math.floor((this.max - this.min) * height + this.min), 0, height, color)
		})

		const zero = -this.min / (this.max - this.min)
		this.lines([[0, zero], [1, zero]], [], color, width)
		this.text(0, 0, zero, 'red')

		this.text(this.min, 0, 0, color)
	}
}

/**
	* # draw the mouse hover
	* @param {array} points - array of points [[x, y], [x, y], ...]
	* @param {number} mouseX - x coordinate of the mouse
*/
Chart.prototype.hover = function(points, mouseX) {
	const rect = this.canvas.getBoundingClientRect()
	const x = (mouseX - rect.left) / this.canvas.x

	// x = (x - 2 * this.axis.x * x + this.axis.x) * this.canvas.width
	// I want to find x
	mouseX = (x - this.axis.x) / (1 - 2 * this.axis.x)

	// if the mouse is outside the canvas, do nothing
	if (mouseX < 0 || mouseX > 1) {
		return
	}

	let point = nearestPoint(points, mouseX)
	let dashedPoints =
		[
			[point[0], 0],
			[point[0], point[1]],
			[0, point[1]]
		]

	this.lines(dashedPoints, [5, 5], 'grey')
	let y_text = Math.floor(point[1] * this.max)
	if (this.min < 0) {
		y_text = Math.floor((point[1] * (this.max - this.min) + this.min))
	}


	this.text(`${y_text}`, 0, point[1])
	this.text(`${point[0]}`, point[0], 0 - this.axis.y)
}

/**
	* # find the nearest point to the mouse
	* @param {array} points - array of points [[x, y], [x, y], ...]
	* @param {number} mouseX - x in [0,1], coordinate of the mouse
*/
function nearestPoint(points, mouseX) {
	let distances = points.map((point) => {
		return Math.abs(point[0] - mouseX)
	})
	let index = distances.findIndex((element) => element === Math.min(...distances))
	return points[index]
}

export { Chart }
