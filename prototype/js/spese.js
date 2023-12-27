class Spese {
	constructor() {
		this.spese = [];
	}

	// Getters
	getSpese() {
		return this.spese;
	}

	// Setters
	setSpese(spese) {
		this.spese = spese;
	}

	// push
	pushSpesa(spesa) {
		this.spese.push(spesa);
		this
	}

	// from csv
	fromCSV(csv) {
		let spese = csv.split('\n');
		spese = spese.map((spesa) => {
			let spesaArray = spesa.split(',');
			return new Spesa(spesaArray[0], spesaArray[1], spesaArray[2], spesaArray[3]);
		});
		this.setSpese(spese)
	}

	// to csv
	toCSV() {
		let csv = '';
		this.spese.forEach((spesa) => {
			csv += `${spesa.getNome()},${spesa.getImporto()},${spesa.getTags()},${spesa.getData()}\n`;
		});
		return csv;
	}

	// to points
	toPoints(days = 30) {
		this.spese.sort((a, b) => {
			return a.date < b.date;
		})

		let index = 0;

		let points = iterateDays(this.spese[0].data).map((day) => {
			if (this.spese[index].data === day) {
				index++;
				return [day, this.spese[index].importo];
			}
			else {
				return [day, 0];
			}
		})

		this.points = points.slice(points.length - days, points.length);
		return points;
	}
}

function iterateDays(startDate) {
	const today = new Date()
	const start = new Date(startDate)
	const days = []

	for (let d = start; d <= today; d.setDate(d.getDate() + 1)) {
		days.push(new Date(d))
	}

	return days
}

class Spesa {
	constructor(nome, importo, tags, data) {
		this.nome = nome;
		this.importo = importo;
		this.tags = tags;
		this.data = data;
	}
}
