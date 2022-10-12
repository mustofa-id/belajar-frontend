import { deletePlan, loadPlans, plans, preparePlanUpdate } from '../data/plan.js';

export function setupListPlanView() {
	const planBox = document.getElementById('content');

	function renderPlans() {
		planBox.innerHTML = '';
		for (const plan of plans) {
			/** @type {PlanItem} */
			const planItemElement = document.createElement('plan-item');
			planItemElement.item = plan;
			planItemElement.addEventListener('typing', (e) => {
				const { type, value } = e.detail;
				plan[type] = value;
				preparePlanUpdate(plan);
			});
			planItemElement.addEventListener('done', () => {
				plan.done = !plan.done;
				planItemElement.item = plan;
				preparePlanUpdate(plan);
			});
			planItemElement.addEventListener('delete', async () => {
				const ok = confirm(`Hapus rencana "${plan.title}"?`);
				if (ok) {
					// TODO: use custom confirm dialog
					await deletePlan(plan.id);
				}
			});
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

	loadPlans();
	document.addEventListener('plan-change', renderPlans);
}
