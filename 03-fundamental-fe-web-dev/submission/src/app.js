import './app.css';
import './components/plan-filter.js';
import './components/plan-item.js';

const init = () => {
	console.log('init');

	/** @type {Plan[]} */
	const items = [
		{
			id: 1,
			title: 'sample1',
			description: 'sample desc1',
			created_at: new Date().toLocaleString()
		},
		{
			id: 2,
			title: 'sample2',
			description: 'sample desc2',
			created_at: new Date().toLocaleString()
		},
		{
			id: 3,
			title: 'sample3',
			description: 'sample desc3',
			created_at: new Date().toLocaleString()
		}
	];
	const plans = document.getElementById('content');
	items.forEach((i) => {
		/** @type {PlanItem} */
		const item = document.createElement('plan-item');
		item.item = i;
		item.addEventListener('typing', (e) => {
			const { type, value } = e.detail;
			i[type] = value;
		});
		item.addEventListener('done', (e) => {
			console.log('done');
			i.done = !i.done;
			item.item = i;
		});
		item.addEventListener('delete', (e) => {
			console.log('delete');
		});
		plans.appendChild(item);
	});

	/** @type {PlanFilter} */
	const filter = document.getElementsByTagName('plan-filter')[0];
	filter.addEventListener('mode', (e) => {
		console.log(e);
	});
	filter.addEventListener('search', (e) => {
		console.log(e);
	});
};

document.addEventListener('DOMContentLoaded', init);
