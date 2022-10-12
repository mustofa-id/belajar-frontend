import { addPlan } from '../data/plan.js';

export function setupNewPlanView() {
	/** @type {HTMLButtonElement} */
	const buttonNewPlan = document.getElementById('btn-new-plan');
	buttonNewPlan.onclick = async () => {
		buttonNewPlan.disabled = true;
		// TODO: show loading state when awaiting
		await addPlan({
			title: '',
			description: ''
		});
		buttonNewPlan.disabled = false;
	};
}
