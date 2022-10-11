import './app.css';
import './components/plan-item.js';

const init = () => {
	console.log('init');

	/** @type {Plan[]} */
	const items = [
		{
			id: 1,
			title: 'sample1',
			description: 'sample-desc1'
		},
		{
			id: 2,
			title: 'sample2',
			description: 'sample-desc2'
		}
	];
	const plans = document.getElementById('content');
	items.forEach((i) => {
		/** @type {PlanItem} */
		const item = document.createElement('plan-item');
		item.classList.add('border-hand-drawn');
		item.item = i;
		item.addEventListener('update', (e) => {
			console.log(e);
		});
		plans.appendChild(item);
	});
};

document.addEventListener('DOMContentLoaded', init);
