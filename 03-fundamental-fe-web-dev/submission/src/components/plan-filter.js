const modes = {
	all: 'Semua daftar rencana',
	uncompleted: 'Belum terlaksana',
	completed: 'Sudah terlaksana'
};

const modeElements = Object.entries(modes)
	.map(
		([value, text]) =>
			`<li>
			<label>
				<input type="radio" name="filter-mode" value="${value}" />
				<span>${text}</span>
			</label>
		</li>`
	)
	.join('');

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
<ul>${modeElements}</ul>
`;

/**
 * Plan filter custom element.
 * This custom element expose custom events:
 * - `onfilter({ type, value })` - type is either `search` nor `mode`
 */
class PlanFilter extends HTMLElement {
	/** @type {((data: { type: 'search' | 'mode', value: string }) => void)?} */
	onfilter = undefined;

	constructor() {
		super();
		this.shadow_root = this.attachShadow({ mode: 'open' });
		this._render();
	}

	_handle_radio = (e) => {
		if (e.target.checked) {
			const value = e.target.value;
			this.onfilter?.({ type: 'mode', value });
		}
	};

	_handle_search = (e) => {
		const value = e.target.value;
		this.onfilter?.({ type: 'search', value });
	};

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

	_render() {
		this.shadow_root.innerHTML = template;
		/** @type {HTMLInputElement[]} */
		this.filter_mode = [];
		for (const input of this.shadow_root.querySelectorAll('input')) {
			if (input.type === 'radio') {
				if (input.value === 'all') {
					input.checked = true;
				}
				this.filter_mode.push(input);
			} else {
				this.filter_text = input;
			}
		}
	}
}

customElements.define('plan-filter', PlanFilter);
