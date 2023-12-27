import LineChart from './linechart.js';

const points = [
	[1 / 11, 1 / 10],
	[2 / 11, 2 / 10],
	[3 / 11, 3 / 10],
	[4 / 11, 0],
	[5 / 11, 4 / 10],
	[6 / 11, -1 / 10],
	[7 / 11, 5 / 10],
	[8 / 11, 10 / 10],
	[9 / 11, 1 / 10],
	[10 / 11, 6 / 10],
	[11 / 11, 5 / 10]
]

let line_chart = new LineChart('line-chart')
line_chart.setAxis(0.1, 0.1)

line_chart.drawLineChart(points)


/*
ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(20, 20)
ctx.lineTo(10, 10)
ctx.stroke()
*/
