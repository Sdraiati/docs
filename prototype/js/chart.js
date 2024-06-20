export class Chart {
	constructor(id) {
		this.canvas = document.getElementById(id)
		this.ctx = this.canvas.getContext('2d')
		this.axis = {
			x: 0.0,
			y: 0.0
		}

		// Get the CSS-computed width and height of the canvas
		const devicePixelRatio = window.devicePixelRatio || 1
		const computedStyle = getComputedStyle(this.canvas);
		const cssWidth = parseInt(computedStyle.getPropertyValue('width'), 10);
		const cssHeight = parseInt(computedStyle.getPropertyValue('height'), 10);

		this.canvas.x = cssWidth
		this.canvas.y = cssHeight

		// improve the pixel ratio
		this.canvas.width = Math.floor(cssWidth * devicePixelRatio)
		this.canvas.height = Math.floor(cssHeight * devicePixelRatio)
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	setAxis(x, y) {
		this.axis = {
			x: x,
			y: y
		}
	}

	x(x) {
		return (x - 2 * this.axis.x * x + this.axis.x) * this.canvas.width
	}

	y(y) {
		return (1 - y + 2 * this.axis.y * y - this.axis.y) * this.canvas.height
	}

	/**
		* # draw the lines between the points
	* @param {array} points - array of points [[x, y], [x, y], ...]
	* @param {array} dash - array of dash [5, 5] for dashed lines
	* @param {string} color - color of the line
	* @param {number} width - width of the line
	*/
	lines(points, dash = [], color = 'black', width = 1) {
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = width

		points = points.map((point) => {
			return [this.x(point[0]), this.y(point[1])]
		})

		this.ctx.setLineDash(dash)
		this.ctx.beginPath()
		this.ctx.moveTo(points[0][0], points[0][1])

		points.forEach((point) => {
			this.ctx.lineTo(point[0], point[1])
		})
		this.ctx.stroke()
		this.ctx.setLineDash([])
	}

	// write text
	text(text, x, y, color = 'black', size = 1, padding = 5, font = 'Arial') {
		this.ctx.fillStyle = color
		size = size * this.canvas.width / 500
		this.ctx.font = `${size}em ${font}`

		if (typeof text === 'number') {
			// bug fix
			text = Math.round(text * 100) / 100
		}

		this.ctx.fillText(text, this.x(x) + padding, this.y(y) - padding)
	}

	// draw grid
	drawAxis(xLegend = '', yLegend = '', color = 'black', width = 1) {
		let x = [[0, 0], [1, 0]]
		let y = [[0, 0], [0, 1]]

		this.lines(x, [], color, width)
		this.lines(y, [], width)

		this.text(xLegend, 1, 0, color, 12)
		this.text(yLegend, 0, 1, color, 12)
	}
}

export default Chart;
