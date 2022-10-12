/** @typedef {import('../data/api').Plan} Plan */

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

article {
	padding: 8px;
	border: solid 2px;	
	border-color: #333;
	border-radius: var(--app-border-hand-drawn);
	height: min-content;
	transition: all 0.2s ease;
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: space-around;
}

article.done {
	border: dashed 2px;
	opacity: 70%;
}

article:hover {
	box-shadow: 8px 12px 24px -4px hsla(0, 0%, 0%, 0.2);
}

input, textarea {
	width: 100%;
	text-overflow: ellipsis;
}

textarea {
	word-wrap: break-word;
}

em {
	font-size: 0.8rem;
	font-style: italic;
}

#header {
	display: flex;
	justify-content: space-between;
	gap: 4px;
}

#header input {
	font-size: 1.2rem;
	font-weight: 700;
	font-family: 'Patrick Hand SC', cursive;
}

#header button {
	margin-right: 6px;
}

#body {
	width: 100%;
}

#footer {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
}

#footer button {
	color: #666;
	font-size: medium;
}

article button#delete {
	visibility: hidden;
}

article:hover button#delete {
	visibility: visible;
}

#done:hover {
	color: #5fd068;
}

#delete:hover {
	color: red;
}

button {
	cursor: pointer;
}
</style>

<article>
	<section id="header">
		<span class="material-symbols-outlined">event_note</span>
		<input
			id="title"
			autocomplete="off"
			placeholder="Ketik judul rencana"						
		/>
		<button
			id="done"
			class="material-symbols-outlined"
			tabindex="-1"
		>
			circle
		</button>
	</section>
	<section id="body">
		<textarea
			id="description"						
			autocomplete="off"
			placeholder="Ketik deskripsi tentang rencana"						
			rows="2"				
		></textarea>
	</section>
	<section id="footer">
		<em id="created_at"></em>
		<button 
			id="delete"
			class="material-symbols-outlined"
			title="Hapus rencana"
		>
			delete
		</button>
	</section>
</article>
`;

class PlanItem extends HTMLElement {
	constructor() {
		super();
		this.shadow_root = this.attachShadow({ mode: 'open' });
		this.render();
	}

	connectedCallback() {
		for (const type of Object.keys(this.plan)) {
			this.plan[type].addEventListener('input', this[type + '_event']);
		}
		for (const type of Object.keys(this.action)) {
			this.action[type].addEventListener('click', this[type + '_event']);
		}
	}

	disconnectedCallback() {
		for (const name of Object.keys(this.plan)) {
			this.plan[name].removeEventListener('input', this[name + '_event']);
		}
		for (const type of Object.keys(this.action)) {
			this.action[type].removeEventListener('click', this[type + '_event']);
		}
	}

	_fireEvent(name, type, value) {
		const detail = { type, value };
		const inputEvent = new CustomEvent(name, { detail, cancelable: false });
		this.dispatchEvent(inputEvent);
	}

	/**  @param {Plan} item */
	set item(item) {
		this._item = item ?? {};
		this.plan.title.value = item.title;
		this.plan.description.value = item.description;
		this.plan.created_at.innerText = item.created_at;
		this.action.done.title = this._item.done ? 'Tandai belum selesai' : 'Tandai sudah selesai';
		this.action.done.innerText = this._item.done ? 'task_alt' : 'circle';
		this.shadow_root.children[1].className = this._item.done ? 'done' : '';
	}

	render() {
		this.shadow_root.innerHTML = template;
		this.plan = {
			/** @type {HTMLInputElement} */
			title: this.shadow_root.getElementById('title'),
			/** @type {HTMLTextAreaElement} */
			description: this.shadow_root.getElementById('description'),
			created_at: this.shadow_root.getElementById('created_at')
		};
		this.action = {
			/** @type {HTMLButtonElement} */
			done: this.shadow_root.getElementById('done'),
			/** @type {HTMLButtonElement} */
			delete: this.shadow_root.getElementById('delete')
		};
		// input events
		for (const type of Object.keys(this.plan)) {
			this[type + '_event'] = (e) => {
				const value = e.target.value;
				this._fireEvent('typing', type, value);
			};
		}
		// buton events
		for (const type of Object.keys(this.action)) {
			this[type + '_event'] = () => {
				this._fireEvent(type);
			};
		}
	}
}

customElements.define('plan-item', PlanItem);
