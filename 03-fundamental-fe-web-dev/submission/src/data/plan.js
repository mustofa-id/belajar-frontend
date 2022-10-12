/**
 * @typedef {Object} Plan
 * @property {number} id
 * @property {string} title
 * @property {string?} description
 * @property {boolean} done
 * @property {string} created_at
 */

/**
 * @typedef {'plan-change' | 'plan-loading'} PlanEvent
 */

/** @type {Plan[]} */
export const plans = [];

/** @type {Map<number, Plan>} */
const prepared_plans = new Map();
let prepared_timer;

/**
 * @param {Record<string, string>} clause
 */
export async function loadPlans(clause = {}) {
	fireEvent('plan-loading', { busy: true, clause });
	const params = { ...clause, order: 'created_at.desc' };
	const request = await api('GET', { params });
	if (request.ok) {
		const data = await request.json();
		plans.length = 0;
		plans.push(...data);
	}
	fireEvent('plan-loading', { busy: false, clause });
}

/**
 * @param {Plan} plan
 */
export async function addPlan(plan) {
	const request = await api('POST', { data: plan });
	if (request.ok) {
		const data = await request.json();
		plans.unshift(data[0]);
		fireEvent('plan-change');
	}
}

/**
 * @param {number} id
 */
export async function deletePlan(id) {
	const request = await api('DELETE', { params: { id: `eq.${id}` } });
	if (request.ok) {
		const target_delete_index = plans.findIndex((p) => p.id == id);
		if (~target_delete_index) {
			plans.splice(target_delete_index, 1);
		}
		prepared_plans.delete(id);
		fireEvent('plan-change');
	}
}

/**
 * Debouncing plan update
 * @param {Plan} plan
 */
export function preparePlanUpdate(plan) {
	prepared_plans.set(plan.id, plan);
	clearTimeout(prepared_timer);
	prepared_timer = setTimeout(() => updatePreparedPlans(), 5_000);
	setReloadPreventer();
}

async function updatePreparedPlans() {
	const plans_to_update = prepared_plans.values();
	for (const plan of plans_to_update) {
		const request = await api('PATCH', {
			params: { id: `eq.${plan.id}` },
			data: plan
		});
		if (request.ok) {
			// remove from prepared plans when success
			prepared_plans.delete(plan.id);
		} else {
			// prepare again if failed
			prepared_plans.set(plan.id, plan);
		}
	}
	setReloadPreventer();
}

/**
 * Try to prevent browser reload if
 * there is prepared plans for update
 */
function setReloadPreventer() {
	const has_prepared = prepared_plans.size > 0;
	window.onbeforeunload = has_prepared ? () => false : undefined;
}

/**
 * Make request to remote api
 * @param {string?} method
 * @param {{ params?: Record<string, string>, data?: any }?} opt
 * @returns {Promise<Response>}
 */
function api(method = 'GET', opt = {}) {
	// TODO: use webpack env variable for `anon` and `base_url`
	const anon = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4emR3bXBqa2dvYXp0bmljZW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUzNjg1MjQsImV4cCI6MTk4MDk0NDUyNH0.0BqjxO_ghTtIvW0pvJRZH_PqxlYT4dUPb2tfS-Jca0o`;
	const url = new URL('/rest/v1/plans', 'https://hxzdwmpjkgoaztniceoj.supabase.co');
	if (typeof opt.params === 'object') {
		for (const [key, value] of Object.entries(opt.params)) {
			url.searchParams.append(key, value);
		}
	}
	const init = {
		method,
		headers: {
			apikey: anon,
			authorization: `Bearer ${anon}`,
			'content-type': 'application/json'
		}
	};
	if (opt.data) {
		init.body = JSON.stringify(opt.data);
		init.headers.prefer = 'return=representation';
	}
	// TODO: handle error and notify user
	return fetch(url, init);
}

/**
 *
 * @param {PlanEvent} name
 * @param {object?} data
 */
function fireEvent(name, data) {
	const event = new CustomEvent(name, { detail: data });
	document.dispatchEvent(event);
}
