class LineChart {
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

	drawLine(points) {
		this.ctx.beginPath()
		this.ctx.moveTo(points[0][0], points[0][1])

		points.forEach((point) => {
			this.ctx.lineTo(point[0], point[1])
		})
	}

	// draw lines
	lines(points, color = 'black', width = 1) {
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = width

		points = points.map((point) => {
			return [this.x(point[0]), this.y(point[1])]
		})

		this.drawLine(points)
		this.ctx.stroke()
	}

	// draw dashed lines
	dashedLines(points, color = 'black', width = 1, dash = [5, 5]) {
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = width

		points = points.map((point) => {
			return [this.x(point[0]), this.y(point[1])]
		})

		this.ctx.setLineDash(dash)
		this.drawLine(points)
		this.ctx.stroke()

		this.ctx.setLineDash([])
	}

	// write text
	text(text, x, y, color = 'black', size = 12, padding = 5, font = 'Arial') {
		this.ctx.fillStyle = color
		this.ctx.font = `${size}px ${font}`

		this.ctx.fillText(text, this.x(x) + padding, this.y(y) - padding)
	}

	// draw grid
	drawAxis(xLegend = '', yLegend = '', color = 'black', width = 1) {
		let x = [[0, 0], [1, 0]]
		let y = [[0, 0], [0, 1]]

		this.lines(x, color, width)
		this.lines(y, color, width)

		this.text(xLegend, 1, 0, color, 12)
		this.text(yLegend, 0, 1, color, 12)
	}

	// draw decorations
	decorations(max, min, color = 'grey', width = 1, yHeights = [1, 2 / 3, 1 / 3]) {
		yHeights.forEach((height) => {
			let y = [[0, height], [1, height]]
			this.lines(y, color, width)
		})

		if (min >= 0) {
			yHeights.forEach((height) => {
				this.text(Math.floor(max * height), 0, height, color, 12)
			})
		} else {
			yHeights.forEach((height) => {
				this.text(Math.floor((max - min) * height + min), 0, height, color, 12)
			})

			const zero = -min / (max - min)
			this.lines([[0, zero], [1, zero]], color, width)
			this.text(0, 0, zero, 'red', 12)

			this.text(min, 0, 0, color, 12)
		}
	}

	whereIsMouse(mouseX) {
		const rect = this.canvas.getBoundingClientRect()
		const y = (mouseX - rect.left) / this.canvas.x

		// y = (x - 2 * this.axis.x * x + this.axis.x) * this.canvas.width
		// I want to find x
		const x = (y - this.axis.x) / (1 - 2 * this.axis.x)
		if (x < 0 || x > 1) {
			return -1
		}
		return x
	}

	hover(points, mouseX) {
		if (mouseX === -1) {
			return
		}

		let index = nearestPoint(points, mouseX)
		let point = points[index]
		let dashedPoints =
			[
				[point[0], 0],
				[point[0], point[1]],
				[0, point[1]]
			]

		this.dashedLines(dashedPoints)

		this.text(`${point[1]}`, 0, point[1])
		this.text(`${point[0]}`, point[0], 0)
	}

	drawLineChart(points) {

		if (points.lenght < 1) {
			return
		}

		this.drawAxis()
		this.decorations(10, 4, 'grey', 1)

		this.lines(points, 'black', 1)

		this.canvas.addEventListener('mousemove', (event) => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			this.drawAxis()
			this.decorations(10, 4, 'grey', 1)

			this.lines(points, 'black', 1)

			this.hover(points, this.whereIsMouse(event.clientX))
		})
	}
}

function nearestPoint(points, mouseX) {
	let distances = points.map((point) => {
		return Math.abs(point[0] - mouseX)
	})
	let index = distances.findIndex((element) => element === Math.min(...distances))
	return index
}

export default LineChart
