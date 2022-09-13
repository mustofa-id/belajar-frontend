const initCalculator = {
	displayNumber: '0',
	operator: undefined,
	firstNumber: undefined,
	waitingForSecondNumber: false
};

const operators = {
	'+': (first, second) => Number(first) + Number(second),
	'-': (first, second) => Number(first) - Number(second)
};

let calculator = { ...initCalculator };

function updateDisplay() {
	/** @type {HTMLHeadingElement} */
	const h1 = document.querySelector('#display-number');
	h1.innerText = calculator.displayNumber;
}

function clearCalculator() {
	calculator = { ...initCalculator };
}

function inputDigit(digit) {
	if (calculator.displayNumber == '0') {
		calculator.displayNumber = digit;
	} else {
		calculator.displayNumber += digit;
	}
}

function inverseNumber() {
	if (calculator.displayNumber == '0') return;
	calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(op) {
	if (!calculator.waitingForSecondNumber) {
		calculator.operator = op;
		calculator.waitingForSecondNumber = true;
		calculator.firstNumber = calculator.displayNumber;
		calculator.displayNumber = '0';
	}
}

function performCalc() {
	if (!calculator.operator || !calculator.firstNumber) return;
	const calcResult = operators[calculator.operator](
		calculator.firstNumber,
		calculator.displayNumber
	);
	// add history
	pushHistory({
		firstNumber: calculator.firstNumber,
		operator: calculator.operator,
		secondNumber: calculator.displayNumber,
		result: calcResult
	});
	calculator.displayNumber = calcResult;
	calculator.waitingForSecondNumber = false;
	renderHistory();
}

document.querySelectorAll('.calc-button').forEach((b) => {
	b.addEventListener('click', (e) => {
		// handle clear button
		if (e.target.classList.contains('clear')) {
			clearCalculator();
			updateDisplay();
			return;
		}
		// handle plus-minus button
		if (e.target.classList.contains('plus-minus')) {
			inverseNumber();
			updateDisplay();
			return;
		}
		// handle operator buttons
		if (e.target.classList.contains('operator')) {
			handleOperator(e.target.innerText);
			updateDisplay();
			return;
		}
		// handle equals button
		if (e.target.classList.contains('equals')) {
			performCalc();
			updateDisplay();
			return;
		}
		// handle digit input
		inputDigit(e.target.innerText);
		updateDisplay();
	});
});
