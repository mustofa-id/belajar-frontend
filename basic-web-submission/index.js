/** @typedef {{
 * id: string
 * title: string
 * desc: string
 * done: boolean
 * createdAt: number
 * } Plan } */

const PLANS_LS_KEY = 'plans-items';

const planContainer = document.getElementById('content');
const planTemplate = planContainer.children[0];
planTemplate.style.visibility = 'unset';

const storageSupported = typeof localStorage != 'undefined';
// show unsupport storage banner if storage is not supported by browser
if (!storageSupported) {
	const storageBanner = document.getElementById('storage-unsupported-banner');
	storageBanner.style.display = 'flex';
}

/** @type {Plan[]} */
const samplePLans = [
	{
		id: _generateId(),
		title: 'Beli amunisi untuk koding',
		desc: 'Americano tanpa gula 1 cup dan Roti cokelat 2 pcs',
		done: false,
		createdAt: Date.now(),
	},
	{
		id: _generateId(),
		title: 'Kelas web dasar Dicoding',
		desc: 'Lanjutkan materi kursus kelas Web Dasar di Dicoding. Semangat!',
		done: true,
		createdAt: Date.now(),
	},
	{
		id: _generateId(),
		title: 'Lorem ipsum dolor',
		desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, fuga commodi. Saepe aspernatur dolor eos quasi!`,
		done: false,
		createdAt: Date.now(),
	},
];

/** @type {Plan[]} */
let plans = [];

/**
 * Add/prepare new Plan
 */
function addPlan() {
	// declare new Plan object
	/** @type {Plan} */
	const newPlan = {
		id: _generateId(),
		title: '',
		desc: '',
		done: false,
		createdAt: Date.now(),
	};
	// add new Plan object to the first of Plans array
	plans.unshift(newPlan);
	// re-render plans elements
	renderPlans();
	// focus to newly added plan element input
	planContainer.children[0].getElementsByTagName('input')[0].focus();
}

/**
 * Mark Plan as done
 * @param {Plan} plan
 */
function finishPlan(plan) {
	plan.done = !plan.done;
	renderPlans();
	_persistPlans();
}

/**
 * Delete selected Plan
 * @param {Plan} plan
 */
function deletePlan(plan) {
	let ok =
		plan.title || plan.desc
			? // ask before delete if title or desc not empty
			  confirm(`Hapus rencana "${plan.title}"?`)
			: true; // delete directly
	if (ok) {
		plans = plans.filter((p) => p.id !== plan.id);
		renderPlans();
		_persistPlans();
	}
}

/**
 * Render Plan items as element
 */
function renderPlans() {
	planContainer.innerHTML = !plans.length ? '<p>Belum ada plan!</p>' : '';
	for (const plan of plans) {
		const el = _createPlanItemElement(plan);
		planContainer.append(el);
	}
}

/**
 * Create Plan item element based on Plan item template
 * @param {Plan} plan
 * @returns {HTMLElement}
 */
function _createPlanItemElement(plan) {
	/** @type {HTMLElement} */
	const container = planTemplate.cloneNode(true);
	container.id = 'item-' + plan.id;
	container.style.borderStyle = plan.done ? 'dashed' : 'solid';
	/** @type {HTMLInputElement} */
	const title = container.getElementsByTagName('input')[0];
	title.value = plan.title;
	title.oninput = _debounce((e) => {
		plan.title = e.target.value;
		_persistPlans();
	});
	/** @type {HTMLTextAreaElement} */
	const desc = container.getElementsByTagName('textarea')[0];
	desc.value = plan.desc;
	desc.oninput = _debounce((e) => {
		plan.desc = e.target.value;
		_persistPlans();
	});
	/** @type {HTMLElement} */
	const time = container.getElementsByTagName('em')[0];
	time.innerText = new Date(plan.createdAt).toLocaleString();
	/** @type {HTMLButtonElement[]} */
	const actions = [...container.getElementsByTagName('button')];
	actions.forEach((btn) => {
		if (btn.classList.contains('done')) {
			btn.innerText = plan.done ? 'task_alt' : 'radio_button_unchecked';
			btn.title = plan.done
				? 'Batalkan status selesai'
				: 'Tandai rencana ini selesai';
			btn.addEventListener('click', () => finishPlan(plan));
		} else if (btn.classList.contains('delete')) {
			btn.addEventListener('click', () => deletePlan(plan));
		}
	});
	// TODO: should we remove listeners when elements re-render? and how?
	return container;
}

/**
 * Persist Plan items to LocalStorage
 */
function _persistPlans() {
	if (!storageSupported) return;
	const lsValue = JSON.stringify(plans || []);
	localStorage.setItem(PLANS_LS_KEY, lsValue);
}

/**
 * Load Plan items from LocalStorage
 * @returns {Plan[]}
 */
function _populatePlans() {
	// load sample plans data if Storage API unsupported
	if (!storageSupported) plans = [...samplePLans];
	// retrive plans from local storage
	const lsValue = localStorage.getItem(PLANS_LS_KEY);
	if (!lsValue) {
		plans = [...samplePLans];
		// persist sample value to local storage
		_persistPlans();
		return;
	}
	// load from local storage
	plans = JSON.parse(lsValue);
}

/**
 * Generate random string as id
 * @returns {string}
 */
function _generateId() {
	// taken from: https://stackoverflow.com/a/1349426/8299065
	return Math.random().toString(36).substring(2, 10);
}

/**
 * Doubounce function to makes sure that code is only triggered once per user input
 * taken from: https://www.freecodecamp.org/news/javascript-debounce-example/
 *
 * @param {Function} func
 * @param {number} timeout
 * @returns Function
 */
function _debounce(func, timeout = 800) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

_populatePlans();
renderPlans();
