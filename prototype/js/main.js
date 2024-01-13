import { Chart } from './histogram.js'

const points = [
	[1 / 11, 1 / 10],
	[2 / 11, 2 / 10],
	[3 / 11, 3 / 10],
	[4 / 11, 0],
	[5 / 11, 4 / 10],
	[6 / 11, 1 / 10],
	[7 / 11, 5 / 10],
	[8 / 11, 10 / 10],
	[9 / 11, 1 / 10],
	[10 / 11, 6 / 10],
	[11 / 11, 5 / 10]
]

let chart = new Chart('line-chart')
chart.setAxis(0.1, 0.1)

chart.drawAxis()
chart.decorations(10, 4, 'grey', 1)

chart.lines(points)

points.forEach((point) => {
	chart.drawRect(point[0], point[1], 1 / points.length, 1 / 10, 'grey')
})

chart.canvas.addEventListener('mousemove', (event) => {
	// redraw everything all over to delete the previous hover
	chart.clear();

	chart.decorations(10, 4, 'grey', 1)

	points.forEach((point) => {
		chart.drawRect(point[0], point[1], 1 / points.length, 1 / 10, 'grey')
	})
	chart.lines(points)

	chart.hover(points, event.clientX)
})
