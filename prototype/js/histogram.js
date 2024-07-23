import { Chart } from './lineChart.js'

Chart.prototype.drawRect = function(x, y, width, height, color) {
	this.drawAxis()

	y = y * height
	// Y = (1 - y + 2 * this.axis.y * y - this.axis.y) * this.canvas.height
	// Y / this.canvas.height = (1 - y + 2 * this.axis.y * y - this.axis.y)
	height = y * (1 - 2 * this.axis.y) * this.canvas.height
	x -= 2 / 5 * width
	width *= 4 / 5
	width = width * (1 - 2 * this.axis.x) * this.canvas.width

	this.ctx.fillStyle = color
	this.ctx.fillRect(this.x(x), this.y(y), width, height)
}

export { Chart }
