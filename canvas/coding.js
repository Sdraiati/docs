//! Canvas 2D Context
//! Prototyping

import Canvas from './canvas.js'
import Spese from './spese.js'

///
/// UNO
///

const uno = document.getElementById('uno')
const ctx_uno = uno.getContext('2d')

const uno_w = screen.width
const uno_h = screen.height

uno.width = uno_w
uno.height = uno_h

ctx_uno.beginPath() // start a brand new path
// ctx_uno.moveTo(x, y)
ctx_uno.moveTo(1 / 4 * uno_w, 2 / 5 * uno_h)
ctx_uno.lineTo(1 / 4 * uno_w, 4 / 5 * uno_h)
ctx_uno.lineTo(3 / 4 * uno_w, 4 / 5 * uno_h)
ctx_uno.lineTo(3 / 4 * uno_w, 2 / 5 * uno_h)
ctx_uno.lineTo(1 / 2 * uno_w, 1 / 5 * uno_h)
ctx_uno.lineTo(1 / 4 * uno_w, 2 / 5 * uno_h)
ctx_uno.stroke()

ctx_uno.beginPath() // start a brand new path
ctx_uno.arc(3 / 8 * uno_w, 4 / 5 * uno_h, 1 / 8 * uno_w, Math.PI, Math.PI * 2) // draw a circle
// (center_x, certer_y, radius, starting_angle, ending_angle)
ctx_uno.stroke()	// draw the path

ctx_uno.beginPath()
ctx_uno.rect(125, 75, 10, 25) // draw a rectangle
// (x, y, width, height)
ctx_uno.stroke()

ctx_uno.beginPath()
ctx_uno.moveTo(130, 70)
ctx_uno.lineTo(200, 70)
ctx_uno.stroke()

///
/// UNO-BIS
///

const points = [
	[1 / 4, 2 / 5],
	[1 / 4, 4 / 5],
	[3 / 4, 4 / 5],
	[3 / 4, 2 / 5],
	[1 / 2, 1 / 5],
	[1 / 4, 2 / 5]
]

let uno_bis = new Canvas('uno-bis')

uno_bis.setWidth(uno_w)
	.setHeight(uno_h)
	.withProportion(true)

uno_bis.lines(points)

///
/// DUE
///

const due = document.getElementById('due')
const ctx_due = due.getContext('2d')

ctx_due.beginPath()
ctx_due.lineWidth = 20 // set the line width
ctx_due.strokeStyle = 'red' // set the line color
ctx_due.rect(50, 25, 200, 100)

ctx_due.fillStyle = 'yellow' // set the fill color
ctx_due.fill()
ctx_due.stroke()


/// 
/// TRE
///

const tre = document.getElementById('tre')
const ctx_tre = tre.getContext('2d')

ctx_tre.beginPath()
ctx_tre.strokeStyle = 'blue'
ctx_tre.lineWidth = 15
ctx_tre.rect(100, 25, 100, 100)
ctx_tre.fillStyle = 'white'
ctx_tre.fill()
ctx_tre.stroke()

ctx_tre.beginPath()
ctx_tre.rect(130, 60, 35, 35)
ctx_tre.fill()
ctx_tre.stroke()

///
/// QUATTRO
///

const spese = new Spese('tecnologiche')

spese.fromPoints([
	[0, -1000],
	[1, -100],
	[2, 50],
	[3, 0],
	[5, -1000],
	[100, -400],
	[6, 6000],
	[7, 700],
	[8, -800],
	[9, 900],
	[10, -1000]
	//[x, y]
])

let quattro = new Canvas('quattro')

quattro.setWidth(2 * uno_w)
	.setHeight(2 * uno_h)
	.withProportion(true)

quattro.setStrokeStyle('blue')
	.setLineWidth(2)

quattro
	.setAxis(1 / 40, 1 / 5) // set the origin of the axis (x, y)
	.axisLineWidth(4) // set the line width of the axis
	.axisStrokeStyle('black') // set the line color of the axis
	.drawAxis()

let x = parseInt(spese.getMin())
quattro.lines(spese.toPoints())
quattro.grid(Math.floor(spese.getMax()), x)
