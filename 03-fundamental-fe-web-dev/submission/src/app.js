import './app.css';
import './components/plan-filter.js';
import './components/plan-item.js';
import { setupListPlanView } from './views/list-plan';
import { setupMainView } from './views/main';
import { setupNewPlanView } from './views/new-plan';

const init = () => {
	/** @type {PlanFilter} */
	const filter = document.getElementsByTagName('plan-filter')[0];
	filter.addEventListener('mode', (e) => {
		console.log(e);
	});
	filter.addEventListener('search', (e) => {
		console.log(e);
	});

	setupMainView();
	setupListPlanView();
	setupNewPlanView();
};

document.addEventListener('DOMContentLoaded', init);
