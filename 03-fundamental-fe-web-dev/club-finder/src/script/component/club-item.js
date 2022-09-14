class ClubItem extends HTMLElement {
	set club(club) {
		this._club = club;
		this.render();
	}

	render() {
		const { fanArt, name, description } = this._club;
		this.innerHTML = `
            <img class="fan-art-club" src="${fanArt}" alt="Fan Art">
            <div class="club-info">
            <h2>${name}</h2>
            <p>${description}</p></div>
        `;
	}
}

customElements.define('club-item', ClubItem);
