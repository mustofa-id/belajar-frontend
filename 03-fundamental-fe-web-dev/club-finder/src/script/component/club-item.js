class ClubItem extends HTMLElement {
	constructor() {
		super();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
	}

	set club(club) {
		this._club = club;
		this.render();
	}

	render() {
		const { strTeamBadge, strTeam, strDescriptionEN } = this._club;
		this._shadowRoot.innerHTML = `
			<style>
				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}
				:host {
					display: block;
					margin-bottom: 18px;
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
					border-radius: 10px;
					overflow: hidden;
				}
				
				:host .fan-art-club {
					width: 100%;
					max-height: 300px;
					object-fit: cover;
					object-position: center;
				}

				.club-info {
					padding: 24px;
				}
				
				.club-info > h2 {
					font-weight: lighter;
				}
				
				.club-info > p {
					margin-top: 10px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 10; /* number of lines to show */
				}
			</style>
            <img class="fan-art-club" src="${strTeamBadge}" alt="Fan Art">
            <div class="club-info">
            <h2>${strTeam}</h2>
            <p>${strDescriptionEN}</p></div>
        `;
	}
}

customElements.define('club-item', ClubItem);
