const template = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

* {
	all: unset;
	display: revert;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

h2 {
	font-size: 1.5rem;
	font-weight: 700;
	text-align: center;
}

.search-box {
	display: flex;
	width: 100%;
	border: solid 1px #333;
	border-radius: var(--app-border-hand-drawn);
	padding: 2px 4px;
	text-align: initial;
}

ul {
	list-style-type: none;
	text-align: initial;
	margin: 8px;
	cursor: pointer;
}

input[type=search] {
	width: 100%;
}

input[type=radio] {
	all: revert;
}
</style>

<h2>Filter daftar rencana</h2>
<div class="search-box">
	<span class="material-symbols-outlined"> search </span>
	<input
		type="search"		
		placeholder="Judul atau deskripsi rencana"
		title="Ketik judul atau deskripsi rencana yang akan di-filter"
	/>
</div>
<ul>
	<li>
		<label>
			<input type="radio" name="filter-mode" value="all" />
			<span>Semua daftar rencana</span>
		</label>
	</li>
	<li>
		<label>
			<input type="radio" name="filter-mode" value="uncompleted" />
			<span>Belum terlaksana</span>
		</label>
	</li>
	<li>
		<label>
			<input type="radio" name="filter-mode" value="completed" />
			<span>Sudah terlaksana</span>
		</label>
	</li>
</ul>
`;

class PlanFilter extends HTMLElement {
	constructor() {
		super();
		this.shadow_root = this.attachShadow({ mode: 'open' });
		this.render();
	}

	_handle_radio = (e) => {
		if (e.target.checked) {
			this._fireEvent('mode', e.target.value);
		}
	};

	_handle_search = (e) => {
		this._fireEvent('search', e.target.value);
	};

	_fireEvent(name, value) {
		const detail = { value };
		const inputEvent = new CustomEvent(name, { detail, cancelable: false });
		this.dispatchEvent(inputEvent);
	}

	connectedCallback() {
		for (const mode of this.filter_mode) {
			mode.addEventListener('change', this._handle_radio);
		}
		this.filter_text.addEventListener('input', this._handle_search);
	}

	disconnectedCallback() {
		for (const mode of this.filter_mode) {
			mode.removeEventListener('change', this._handle_radio);
		}
		this.filter_text.removeEventListener('input', this._handle_search);
	}

	render() {
		this.shadow_root.innerHTML = template;
		/** @type {HTMLInputElement[]} */
		this.filter_mode = [];
		for (const input of this.shadow_root.querySelectorAll('input')) {
			if (input.type === 'radio') {
				this.filter_mode.push(input);
			} else {
				this.filter_text = input;
			}
		}
	}
}

customElements.define('plan-filter', PlanFilter);
