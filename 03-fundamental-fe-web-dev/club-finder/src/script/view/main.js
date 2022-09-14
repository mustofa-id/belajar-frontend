import '../component/app-bar.js';
import '../component/search-bar.js';
import '../component/club-list.js';
import DataSource from '../data/data-source.js';

export default function () {
	const searchElement = document.querySelector('search-bar');
	const clubListElement = document.querySelector('club-list');

	const onButtonSearchClicked = async () => {
		try {
			const results = await DataSource.searchClub(searchElement.value);
			renderResult(results);
		} catch (error) {
			fallbackResult(error);
		}
	};

	const renderResult = (results) => {
		clubListElement.clubs = results;
	};

	const fallbackResult = (message) => {
		clubListElement.renderError(message);
	};

	searchElement.onSearch = onButtonSearchClicked;
}
