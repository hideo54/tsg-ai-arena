const data = JSON.parse(
	document.querySelector('meta[name="data"]').getAttribute('content')
);
let output = '<table style="border-collapse: collapse">';
const size = 11;

for (let y = 0; y < size; y++) {
	output += '<tr>';
	for (let x = 0; x < size; x++) {
		let color = '';
		if (x == 0 && y == 0) {
			color = 'deepskyblue';
		} else if (x == 10 && y == 10) {
			color = 'gold';
		} else {
			color = '#eee';
		}
		let text = '';
		if (x == 0 && y == 0) {
			text = '<span style="color: royalblue; font-size: 30px">●</span>';
		}
		if (x == 10 && y == 10) {
			text = '<span style="color: darkorange; font-size: 30px">●</span>';
		}
		output +=
			`<th style="text-align: center; border: 1px black solid; width: 40px; height: 40px; background-color:${
				color
			};">${
				text
			}</th>`;
	}
	output += '</tr>';
}
output += '</table>';
document.querySelector('#app').innerHTML = output;

let turn = 0;

setInterval(() => {
	const lines = data.turns[turn].input.split('\n');
	const [T, P] = lines[0].split(' ').map((token) => parseInt(token));
	const [x1, y1] = lines[1].split(' ').map((token) => parseInt(token));
	const [x2, y2] = lines[2].split(' ').map((token) => parseInt(token));
	const field = new Array(size);
	for (var y = 0; y < size; y++) {
		field[y] = lines[y + 3].split(' ').map((token) => parseInt(token));
	}
	const [N] = lines[size + 3].split(' ').map((token) => parseInt(token));
	const soup = new Array(N);
	for (var i = 0; i < N; i++) {
		const [x, y] = lines[size + 4 + i]
			.split(' ')
			.map((token) => parseInt(token));
		soup[i] = {x, y};
	}
	let output = '<table style="border-collapse: collapse">';
	for (var y = 0; y < size; y++) {
		output += '<tr>';
		for (let x = 0; x < size; x++) {
			let color = '';
			if (field[y][x] == 0) {
				color = '#eee';
			} else if (field[y][x] == 1) {
				color = 'deepskyblue';
			} else {
				color = 'gold';
			}
			let text = '';
			const isSoup = false;
			for (var i = 0; i < soup.length; i++) {
				if (soup[i].x == x && soup[i].y == y) {
					text = '<span style="color: red; font-size: 30px">★</span>';
				}
			}

			if (x1 == x && y1 == y) {
				text = '<span style="color: royalblue; font-size: 30px">●</span>';
			}
			if (x2 == x && y2 == y) {
				text = '<span style="color: darkorange; font-size: 30px">●</span>';
			}
			output +=
				`<th style="text-align: center; border: 1px black solid; width: 40px; height: 40px; background-color:${
					color
				};">${
					text
				}</th>`;
		}
		output += '</tr>';
	}
	output += '</table>';
	document.querySelector('#app').innerHTML = output;
	if (turn < data.turns.length - 1) {
		turn++;
	}
}, 300);
