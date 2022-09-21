export default class DataSource {
	static async searchClub(keyword) {
		const url = new URL(`https://sports-api.dicoding.dev/teams/search`);
		url.searchParams.set('t', keyword);
		const response = await fetch(url);
		const { teams } = await response.json();
		if (!teams) throw new Error(`${keyword} is not found`);
		return teams;
	}
}
