/** @typedef {{
 * id: string
 * title: string
 * desc: string
 * done: boolean
 * createdAt: number
 * } Plan } */

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
		done: false,
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
let plans = [...samplePLans];

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
	title.oninput = (e) => {
		plan.title = e.target.value;
		console.log('title changed:', plan.title);
	};
	/** @type {HTMLTextAreaElement} */
	const desc = container.getElementsByTagName('textarea')[0];
	desc.value = plan.desc;
	desc.oninput = (e) => {
		plan.desc = e.target.value;
		console.log('desc changed:', plan.desc);
	};
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
function _persistPlans() {}

/**
 * Load Plan items from LocalStorage
 * @returns {Plan[]}
 */
function _retrivePlans() {
	return [];
}

/**
 * Generate random string as id
 * @returns {string}
 */
function _generateId() {
	// taken from: https://stackoverflow.com/a/1349426/8299065
	return Math.random().toString(36).substring(2, 10);
}

renderPlans();
