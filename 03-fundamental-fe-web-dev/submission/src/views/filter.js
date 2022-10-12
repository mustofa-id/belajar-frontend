import { loadPlans } from '../data/plan';

export function setupFilterView() {
	/** @type {PlanFilter} */
	const plan_filter = document.querySelector('plan-filter');

	/** @type {keyof modes} */
	let mode = 'all';

	/** @type {string=} */
	let query;

	/** @type {number=} */
	let query_timer;

	plan_filter.onmodechange = (value) => {
		mode = value;
		filter_plans();
	};

	plan_filter.onsearch = (value) => {
		query = value;
		clearTimeout(query_timer);
		query_timer = setTimeout(() => filter_plans(), 800);
	};

	function filter_plans() {
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
