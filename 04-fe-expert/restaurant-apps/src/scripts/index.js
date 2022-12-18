import 'regenerator-runtime'; /* for async await transpile */
import data from '../DATA.json';
import '../styles/index.scss';

function setupTopBar() {
	let timer;

	const topBar = document.querySelector('.top-bar');
	const hero = document.querySelector('.hero');

	document.onscroll = () => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			const rect = hero.getBoundingClientRect();
			if (rect.bottom > 0) {
				topBar.removeAttribute('data-floating');
			} else {
				topBar.setAttribute('data-floating', '');
			}
		}, 150);
	};
}

function loadRestaurants() {
	const restaurantContainer = document.querySelector('.restaurants');
	for (const r of data.restaurants) {
		const card = document.createElement('article');
		card.innerHTML = `
			<img src="${r.pictureId}" alt="Image of ${r.name} at ${r.city} city" loading="lazy"/>
			<h2>${r.name}</h2>
			<h3>${r.city} &bullet; ${r.rating} &star;</h2>
			<p>${r.description}</p>
		`;
		restaurantContainer.appendChild(card);
	}
}

function init() {
	setupTopBar();
	loadRestaurants();
}

document.addEventListener('DOMContentLoaded', init);
