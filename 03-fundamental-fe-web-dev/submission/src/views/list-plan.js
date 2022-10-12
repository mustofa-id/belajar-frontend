import { deletePlan, loadPlans, plans, preparePlanUpdate } from '../data/plan';

export function setupListPlanView() {
	const plan_box = document.getElementById('plan-list-box');

	/**
	 * @param {CustomEvent<{ clause: Record<string, string>}>} e
	 */
	function render_plans(e) {
		plan_box.innerHTML = '';
		for (const plan of plans) {
			/** @type {PlanItem} */
			const plan_item_element = document.createElement('plan-item');
			plan_item_element.item = plan;
			plan_item_element.ontyping = ({ type, value }) => {
				plan[type] = value;
				preparePlanUpdate(plan);
			};
			plan_item_element.onaction = ({ type }) => {
				if (type === 'done') {
					plan.done = !plan.done;
					plan_item_element.item = plan;
					preparePlanUpdate(plan);
				} else if (type === 'delete') {
					handle_delete_plan(plan);
				}
			};
			plan_box.appendChild(plan_item_element);
		}
		if (!plans.length) {
			plan_box.style.justifyContent = 'center';
			const has_clause = Object.keys(e?.detail?.clause ?? {}).length > 0;
			plan_box.innerHTML = `
				<div style="text-align: center; margin-top: 2rem;">
					<h2>${
						has_clause
							? 'Tidak ada data rencana yang cocok dengen filter'
							: 'Belum ada data rencana'
					}</h2>
					<em>${
						has_clause
							? 'Cek kembali kata kunci yang dimasukan pada filter'
							: 'Klik tombol baru di pojok kanan atas untuk membuat rencana baru'
					}</em>
				</div>
			`;
		} else {
			plan_box.style.justifyContent = 'unset';
		}
	}

	function render_loader(e) {
		const busy = e.detail.busy;
		if (busy) {
			plan_box.style.justifyContent = 'center';
			plan_box.innerHTML = `
				<div style="text-align: center; margin-top: 2rem;">
					<h2>Loading...</h2>				
				</div>
			`;
		} else {
			render_plans(e);
		}
	}

	document.addEventListener('plan-change', render_plans);
	document.addEventListener('plan-loading', render_loader);
	loadPlans();
}

function handle_delete_plan(plan) {
	// TODO: use custom confirm dialog
	if (!plan.title && !plan.description) {
		// delete directly when no title and description
		deletePlan(plan.id);
	} else {
		const title = plan.title || '<Tidak ada judul>';
		const desc = plan.description
			? plan.description.substring(0, 50) + '...'
			: '<Tidak ada deskripsi>';
		const ok = confirm(`Hapus rencana dengan judul: "${title}" dan deskripsi: "${desc}"?`);
		if (ok) deletePlan(plan.id);
	}
}
