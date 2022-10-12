import './app.css';
import './components/plan-filter.js';
import './components/plan-item.js';
import { setupFilterView } from './views/filter';
import { setupListPlanView } from './views/list-plan';
import { setupMainView } from './views/main';
import { setupNewPlanView } from './views/new-plan';

const init = () => {
	setupMainView();
	setupFilterView();
	setupListPlanView();
	setupNewPlanView();
};

document.addEventListener('DOMContentLoaded', init);
