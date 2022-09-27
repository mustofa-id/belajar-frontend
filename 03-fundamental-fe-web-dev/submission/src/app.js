import { user } from './data/user.js';
import '@unocss/reset/tailwind.css';
import 'uno.css';

const init = () => {
	const h1 = document.createElement('h1');
	h1.innerText = 'Hello, Amber Movie app!';
	h1.className = 'text-2xl text-amber-800';
	const pre = document.createElement('pre');
	pre.innerText = JSON.stringify(user, null, 2);
	document.documentElement.append(h1, pre);
};

document.addEventListener('DOMContentLoaded', init);
