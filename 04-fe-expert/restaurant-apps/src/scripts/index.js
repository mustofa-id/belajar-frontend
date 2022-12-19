import data from '../DATA.json';
import '../styles/index.scss';

function setupTopBar() {
	const topBar = document.querySelector('.top-bar');
	const topBarToggle = /** @type {HTMLButtonElement} */ (topBar.querySelector('.top-bar__toggle'));
	const topBarMenu = topBar.querySelector('.top-bar__menu');
	const hero = document.querySelector('.hero');

	topBarToggle.onclick = () => {
		topBarMenu.classList.toggle('top-bar__menu--shown');
		console.log('toggle');
	};

	document.onscroll = () => {
		const heroRect = hero.getBoundingClientRect();
		if (heroRect.bottom > 24) {
			topBar.classList.remove('top-bar--fixed');
		} else {
			topBar.classList.add('top-bar--fixed');
		}
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
