const HISTORY_KEY = 'calculation-history';
const storageSupported = typeof localStorage != 'undefined';

if (!storageSupported) {
	const infoEl = document.createElement('p');
	infoEl.innerText =
		'⚠️ Browser tidak mendukung teknologi Storage. ' + 'Riwayat tidak akan tersimpan.';
	infoEl.className = 'warning';
	document.querySelector('.history').append(infoEl);
}

/**
 * @typedef {{
 *  firstNumber: number
 *  operator: string
 *  secondNumber: number
 *  result: number
 * }} CalcHistory
 */

/** @type {string | undefined} */
const historiesLs = storageSupported ? localStorage.getItem(HISTORY_KEY) : undefined;
/** @type {CalcHistory[]} */
const histories = historiesLs ? JSON.parse(historiesLs) : [];

/**
 * Add history
 * @param {CalcHistory} calc
 */
function pushHistory(calc) {
	histories.unshift(calc);
	if (histories.length > 10) {
		histories.pop();
	}
	storageSupported && localStorage.setItem(HISTORY_KEY, JSON.stringify(histories));
}

function renderHistory() {
	/** @type {HTMLTableSectionElement} */
	const tbody = document.querySelector('#history-list');
	tbody.innerHTML = histories.length > 0 ? '' : 'Belum ada riwayat';
	for (let h of histories) {
		const row = document.createElement('tr');
		row.innerHTML = `<td>${h.firstNumber}</td>
        <td>${h.operator}</td>
        <td>${h.secondNumber}</td>
        <td>${h.result}</td>`;
		tbody.appendChild(row);
	}
}

renderHistory();
