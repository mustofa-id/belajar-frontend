import { addPlan } from '../data/plan';

export function setupNewPlanView() {
	/** @type {HTMLButtonElement} */
	const btn_new_pan = document.getElementById('btn-new-plan');
	btn_new_pan.onclick = async () => {
		btn_new_pan.disabled = true;
		// TODO: show loading state when awaiting
		await addPlan({
			title: '',
			description: ''
		});
		btn_new_pan.disabled = false;
		// TODO: focus to newly added plan element
	};
}
