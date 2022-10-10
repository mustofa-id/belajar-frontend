import { user } from './data/user.js';

const init = () => {
	const h1 = document.createElement('h1');
	h1.innerText = 'Hello, plan app!';
	const pre = document.createElement('pre');
	pre.innerText = JSON.stringify(user, null, 2);
	document.documentElement.append(h1, pre);
};

document.addEventListener('DOMContentLoaded', init);
