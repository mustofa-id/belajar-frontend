class SearchBar extends HTMLElement {
	constructor() {
		super();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.placeholder = this.getAttribute('placeholder');
	}

	set onSearch(event) {
		this._searchEvent = event;
		this.render();
	}

	get value() {
		const input = this._shadowRoot.querySelector('#search-bar-input');
		return input.value;
	}

	render() {
		this._shadowRoot.innerHTML = `
            <style>
                #search-bar-container {
                    max-width: 800px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    padding: 16px;
                    border-radius: 5px;
                    display: flex;
                    position: sticky;
                    top: 10px;
                    background-color: white;
                }
                
                #search-bar-container > input {
                    width: 75%;
                    padding: 16px;
                    border: 0;
                    border-bottom: 1px solid cornflowerblue;
                    font-weight: bold;
                }
                
                #search-bar-container > input:focus {
                    outline: 0;
                    border-bottom: 2px solid cornflowerblue;
                }
                
                #search-bar-container > input:focus::placeholder {
                    font-weight: bold;
                }
                
                #search-bar-container > input::placeholder {
                    color: cornflowerblue;
                    font-weight: normal;
                }
                
                #search-bar-container > button {
                    width: 23%;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 16px;
                    background-color: cornflowerblue;
                    color: white;
                    border: 0;
                    text-transform: uppercase;
                }
                
                @media screen and (max-width: 550px) {
                    #search-bar-container {
                        flex-direction: column;
                        position: static;
                    }
                
                    #search-bar-container > input {
                        width: 100%;
                        margin-bottom: 12px;
                    }
                
                    #search-bar-container > button {
                        width: 100%;
                    }
                }
            </style>
            <div id="search-bar-container">
                <input id="search-bar-input" placeholder="${this.placeholder}" type="search" />
                <button id="search-bar-button" type="submit">Search</button>
            </div>
        `;
		this._shadowRoot
			.querySelector('#search-bar-button')
			.addEventListener('click', this._searchEvent);
	}
}

customElements.define('search-bar', SearchBar);
