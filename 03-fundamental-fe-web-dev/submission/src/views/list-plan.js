import { deletePlan, loadPlans, plans, preparePlanUpdate } from '../data/plan.js';

export function setupListPlanView() {
	const planBox = document.getElementById('content');

	function renderPlans() {
		planBox.innerHTML = '';
		for (const plan of plans) {
			/** @type {PlanItem} */
			const planItemElement = document.createElement('plan-item');
			planItemElement.item = plan;
			planItemElement.ontyping = ({ type, value }) => {
				plan[type] = value;
				preparePlanUpdate(plan);
			};
			planItemElement.onaction = ({ type }) => {
				if (type === 'done') {
					plan.done = !plan.done;
					planItemElement.item = plan;
					preparePlanUpdate(plan);
				} else if (type === 'delete') {
					// TODO: use custom confirm dialog
					const ok = confirm(`Hapus rencana "${plan.title}"?`);
					if (ok) deletePlan(plan.id);
				}
			};
			planBox.appendChild(planItemElement);
		}
		if (!plans.length) {
			planBox.style.justifyContent = 'center';
			planBox.innerHTML = `
				<div style="text-align: center; margin-top: 2rem;">
					<h2>Belum ada data rencana</h2>
					<em>Klik tombol baru di pojok kanan atas untuk membuat rencana baru</em>
				</div>
			`;
		} else {
			planBox.style.justifyContent = 'unset';
		}
	}

	function renderLoader(e) {
		const busy = e.detail.busy;
		if (busy) {
			planBox.style.justifyContent = 'center';
			planBox.innerHTML = `
				<div style="text-align: center; margin-top: 2rem;">
					<h2>Loading...</h2>				
				</div>
			`;
		} else {
			renderPlans();
		}
	}

	document.addEventListener('plan-change', renderPlans);
	document.addEventListener('plan-loading', renderLoader);
	loadPlans();
}
