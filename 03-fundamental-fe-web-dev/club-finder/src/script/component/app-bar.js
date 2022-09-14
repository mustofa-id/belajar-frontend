class AppBar extends HTMLElement {
	connectedCallback() {
		this.label = this.getAttribute('label');
		this.render();
	}

	render() {
		this.innerHTML = `
            <div id="${this.id}" class="${this.className}">
                <h2>${this.label}</h2>
            </div>
        `;
	}

	attributeChangedCallback(name, _, newVal) {
		this[name] = newVal;
		this.render();
	}

	static get observedAttributes() {
		return ['label'];
	}
}

customElements.define('app-bar', AppBar);
