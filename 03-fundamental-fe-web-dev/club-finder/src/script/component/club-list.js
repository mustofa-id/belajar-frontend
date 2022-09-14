import './club-item.js';

class ClubList extends HTMLElement {
	set clubs(clubs) {
		this._clubs = clubs;
		this.render();
	}

	render() {
		this.innerHTML = ``;
		for (const club of this._clubs) {
			const clubItem = document.createElement('club-item');
			clubItem.club = club;
			this.appendChild(clubItem);
		}
	}

	renderError(message) {
		this.innerHTML = '';
		this.innerHTML += `<h2 class="placeholder">${message}</h2>`;
	}
}

customElements.define('club-list', ClubList);
