const submitBtn = document.querySelector('.submit-btn');
const inputs = document.querySelectorAll('input');
const boxSum = document.querySelector('.sum');
const boxAvg = document.querySelector('.avg');
const boxMax = document.querySelector('.max');
const boxMin = document.querySelector('.min');
let sum, i;
const addBtn = document.querySelector('.add-btn');
const removeBtn = document.querySelector('.remove-btn');
const boxBtns = document.querySelector('.result__box');
const boxInput = document.querySelector('.input__box');

// Funkcja licząca sumę, średnią, znajdująca max i min

function count() {
	const allInput = document.querySelectorAll('input');
	const inputArr = [];
	i = 0;
	sum = 0;

	for (const element of allInput) {
		let actEl = parseInt(element.value);

		if (!isNaN(actEl)) {
			inputArr[i] = actEl;
			sum = sum + actEl;
			i++;
		}
	}

	const avg = inputArr.reduce((a, b) => a + b, 0) / inputArr.length;
	let max = Math.max(...inputArr);
	let min = Math.min(...inputArr);

	boxSum.textContent = sum;
	boxAvg.textContent = avg;
	boxMax.textContent = max;
	boxMin.textContent = min;
}

// Nasłuchiwanie kliknięcia przycisku przelicz

submitBtn.addEventListener('click', () => {
	count();
});

// Nasłuchiwanie kliknięcia zmian w polach do wprowadzania liczb

for (const element of inputs)
	element.addEventListener('change', () => {
		count();
	});

// Dodawanie nowego pola do wpisania liczby

addBtn.addEventListener('click', () => {
	const newInput = document.createElement('input');
	newInput.setAttribute('type', 'text');
	newInput.addEventListener('change', () => {
		count();
	});
	submitBtn.before(newInput);
});

// Usuwanie pustych pól

removeBtn.addEventListener('click', () => {
	const allInput = document.querySelectorAll('input');
	for (const element of allInput) {
		let actEl = parseInt(element.value);
		if (isNaN(actEl)) {
			element.remove();
		}
	}
});