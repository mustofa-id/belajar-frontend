import { loadPlans } from '../data/plan';

export function setupFilterView() {
	/** @type {PlanFilter} */
	const planFilter = document.querySelector('plan-filter');

	/** @type {keyof modes} */
	let mode = 'all';

	/** @type {string=} */
	let query;

	/** @type {number=} */
	let query_timer;

	planFilter.onmodechange = (value) => {
		mode = value;
		filterPlans();
	};

	planFilter.onsearch = (value) => {
		query = value;
		clearTimeout(query_timer);
		query_timer = setTimeout(() => filterPlans(), 800);
	};

	function filterPlans() {
		const clause = {};
		if (mode && mode !== 'all') {
			clause.done = `eq.${mode === 'completed'}`;
		}
		if (query) {
			clause.title = `ilike.*${query}*`;
			clause.description = `ilike.*${query}*`;
		}
		loadPlans(clause);
	}
}
