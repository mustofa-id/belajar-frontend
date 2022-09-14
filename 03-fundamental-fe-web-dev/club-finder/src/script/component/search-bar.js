class SearchBar extends HTMLElement {
	connectedCallback() {
		this.placeholder = this.getAttribute('placeholder');
	}

	set onSearch(event) {
		this._searchEvent = event;
		this.render();
	}

	get value() {
		const input = this.querySelector('#search-bar-input');
		return input.value;
	}

	render() {
		this.innerHTML = `
            <input id="search-bar-input" placeholder="${this.placeholder}" type="search" />
            <button id="search-bar-button" type="submit">Search</button>
        `;
		this.querySelector('#search-bar-button').addEventListener('click', this._searchEvent);
	}
}

customElements.define('search-bar', SearchBar);
