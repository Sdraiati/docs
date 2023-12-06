class Canvas {
	constructor(id) {
		this.canvas = document.getElementById(id)
		this.ctx = this.canvas.getContext('2d')
		this.axis = (0, 0)
	}

	setWidth(width) {
		this.canvas.width = width
		return this
	}

	setHeight(height) {
		this.canvas.height = height
		return this
	}

	setLineWidth(lineWidth) {
		this.ctx.lineWidth = lineWidth
		return this
	}

	setStrokeStyle(strokeStyle) {
		this.ctx.strokeStyle = strokeStyle
		return this
	}

	setFillStyle(fillStyle) {
		this.ctx.fillStyle = fillStyle
		return this
	}

	beginPath() {
		this.ctx.beginPath()
		return this
	}

	setAxis(x, y) {
		this.axis = [x, y]
		return this
	}

	axisLineWidth(axisLineWidth) {
		this.axisLineWidth = axisLineWidth
		return this
	}

	axisStrokeStyle(axisStrokeStyle) {
		this.axisStrokeStyle = axisStrokeStyle
		return this
	}


	drawAxis() {
		let x = [[0, 0], [1, 0]]
		let y = [[0, 0], [0, 1]]
		let oldLineWidth = this.ctx.lineWidth
		let oldStrokeStyle = this.ctx.strokeStyle

		this.setLineWidth(this.axisLineWidth)
			.setStrokeStyle(this.axisStrokeStyle)

		this.lines(x)
		this.lines(y)

		this.setLineWidth(oldLineWidth)
			.setStrokeStyle(oldStrokeStyle)
	}

	lines(points) {
		if (this.proportion) {
			for (let i = 0; i < points.length; i++) {
				points[i][0] = this.proportion_x(points[i][0])
				points[i][1] = this.proportion_y(points[i][1])
			}
		}

		this.ctx.beginPath()
		this.ctx.moveTo(points[0][0], points[0][1])
		for (let i = 1; i < points.length; i++) {
			this.ctx.lineTo(points[i][0], points[i][1])
		}
		this.ctx.stroke()

		return this
	}

	stroke() {
		this.ctx.stroke()
	}

	withProportion(flag) {
		this.proportion = flag
	}

	grid(max) {
		max = max - max % 3

		let oldLineWidth = this.ctx.lineWidth
		let oldStrokeStyle = this.ctx.strokeStyle
		this.setLineWidth(1)
		this.setStrokeStyle('gray')

		let decorations = [
			// top decoration
			[[0, 1],
			[1, 1]],
			// middle decoration
			[[0, 2 / 3],
			[1, 2 / 3]],
			// bottom decoration
			[[0, 1 / 3],
			[1, 1 / 3]],
		]

		for (let i = 0; i < decorations.length; i++) {
			this.lines(decorations[i])
		}

		this.setLineWidth(oldLineWidth)
			.setStrokeStyle(oldStrokeStyle)

		let pad = 10

		this.ctx.font = '2em Arial'
		this.ctx.fillStyle = 'gray'
		this.ctx.fillText(max / 3, this.proportion_x(0) + pad, this.proportion_y(1 / 3) - pad)
		this.ctx.fillText(max / 3 * 2, this.proportion_x(0) + pad, this.proportion_y(2 / 3) - pad)
		this.ctx.fillText(max, this.proportion_x(0) + pad, this.proportion_y(1) - pad)
	}

	// I get the x proportion from the left
	// so I have to consider the axis padding
	proportion_x(x) {
		return (x - 2 * this.axis[0] * x + this.axis[0]) * this.canvas.width
	}

	// I get the y proportion from the bottom
	// so I have to invert the y axis
	// and I have to consider the axis padding
	proportion_y(y) {
		let y_ = this.axis[1]
		let Y = this.canvas.height

		return (1 - y + 2 * y_ * y - y_) * Y
	}
}

export default Canvas
