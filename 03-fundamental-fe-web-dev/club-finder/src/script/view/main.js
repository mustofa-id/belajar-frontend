import '../component/app-bar.js';
import '../component/search-bar.js';
import DataSource from '../data/data-source.js';

export default function () {
	const searchElement = document.getElementsByTagName('search-bar')[0];
	const clubListElement = document.querySelector('#clubList');

	const onButtonSearchClicked = async () => {
		try {
			const results = await DataSource.searchClub(searchElement.value);
			renderResult(results);
		} catch (error) {
			fallbackResult(error);
		}
	};

	const renderResult = (results) => {
		clubListElement.innerHTML = '';
		results.forEach(({ name, fanArt, description }) => {
			const clubElement = document.createElement('div');
			clubElement.setAttribute('class', 'club');

			clubElement.innerHTML = `
				<img class="fan-art-club" src="${fanArt}" alt="Fan Art">
				<div class="club-info">
				<h2>${name}</h2>
				<p>${description}</p></div>
			`;
			clubListElement.appendChild(clubElement);
		});
	};

	const fallbackResult = (message) => {
		clubListElement.innerHTML = '';
		clubListElement.innerHTML += `<h2 class="placeholder"> ${message} </h2>`;
	};

	searchElement.onSearch = onButtonSearchClicked;
}
