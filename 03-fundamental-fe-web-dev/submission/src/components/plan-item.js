/** @typedef {import('../data/api').Plan} Plan */

class PlanItem extends HTMLElement {
	constructor() {
		super();
		this.shadow_root = this.attachShadow({ mode: 'open' });
		this.title_input_event = (e) => {
			const value = e.target.value;
			this.fireUpdateEvent('title', value);
		};
		this.description_input_event = (e) => {
			const value = e.target.value;
			this.fireUpdateEvent('description', value);
		};
	}

	connectedCallback() {
		this.render();
		this.title_input.addEventListener('input', this.title_input_event);
		this.description_input.addEventListener('input', this.description_input_event);
	}

	disconnectedCallback() {
		this.title_input.removeEventListener('input', this.title_input_event);
		this.description_input.removeEventListener('input', this.description_input_event);
	}

	fireUpdateEvent(type, value) {
		const detail = { type, value };
		const inputEvent = new CustomEvent('update', { detail, cancelable: false });
		this.dispatchEvent(inputEvent);
	}

	/**  @param {Plan} item */
	set item(item) {
		this.item_ = item ?? {};
		this.render();
	}

	render() {
		this.shadow_root.innerHTML = `
			<style>
			* {
				all: unset;
				display: revert;
			}
			
			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			.content-item {
				padding: 8px;
				border: solid 2px #333;
				height: min-content;
				transition: all 0.2s ease;
				display: flex;
				width: 100%;
				flex-direction: column;
				justify-content: space-around;
			}

			.content-item:hover {
				box-shadow: 8px 12px 24px -4px hsla(0, 0%, 0%, 0.2);
			}

			.content-item label {
				display: flex;
				gap: 2px;
			}

			.content-item input {
				width: 100%;
				text-overflow: ellipsis;
			}

			.content-item-header {
				display: flex;
				justify-content: space-between;
				gap: 4px;
			}

			.content-item-header input {
				font-size: 1.2rem;
				font-weight: 700;
				font-family: 'Patrick Hand SC', cursive;
			}

			.content-item-header button {
				margin-right: 6px;
			}

			.content-item-footer {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
			}

			.content-item-footer button {
				color: #666;
				font-size: medium;
			}

			.content-item button.delete {
				visibility: hidden;
			}

			.content-item:hover button.delete {
				visibility: visible;
			}

			button.delete:hover {
				color: red;
			}
			</style>
			<article class="content-item ${this.className}">
				<section class="content-item-header">
					<span class="material-symbols-outlined">plan</span>
					<input
						id="plan-input-title"
						autocomplete="off"
						placeholder="Ketik judul rencana"
						value="${this.item_?.title || null}"
					/>
					<button class="material-symbols-outlined hover done" tabindex="-1">
						radio_button_unchecked
					</button>
				</section>
				<textarea
					id="plan-input-description"
					class="content-item-body"
					autocomplete="off"
					placeholder="Ketik deskripsi tentang rencana"
					value=${this.item_?.description || null}
					rows="2"				
				></textarea>
				<span class="content-item-footer">
					<em>${this.item_?.created_at || '-'}</em>
					<button class="material-symbols-outlined delete" title="Hapus rencana">delete</button>
				</span>
			</article>
		`;
		this.title_input = this.shadow_root.getElementById('plan-input-title');
		this.description_input = this.shadow_root.getElementById('plan-input-description');
	}
}

customElements.define('plan-item', PlanItem);
