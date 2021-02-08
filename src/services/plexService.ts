const axios = require('axios').default;

module.exports = class PlexService {
	moviesData: any[];
	seriesData: any[];

	constructor() {
		this.moviesData = [];
		this.seriesData = [];
		this.getData();
		this.fetchIntervall();
	}

	async fetchIntervall() {
		setInterval(this.getData, 30 * 60 * 1000);
	}

	async getData() {
		let response = await axios.get(
			`http://192.168.0.210:32400/library/sections?X-Plex-Token=${process.env.XPlexToken}`
		);
		const sections = response.data.MediaContainer.Directory;
		const moviesKey = sections.find((v) => v.title === 'Filme').key;
		const seriesKey = sections.find((v) => v.title === 'Serien').key;

		response = await axios.get(
			`http://192.168.0.210:32400/library/sections/${moviesKey}/all?X-Plex-Token=${process.env.XPlexToken}`
		);

		this.moviesData = response.data.MediaContainer.Metadata;

		response = await axios.get(
			`http://192.168.0.210:32400/library/sections/${seriesKey}/all?X-Plex-Token=${process.env.XPlexToken}`
		);

		this.seriesData = response.data.MediaContainer.Metadata;
	}
};
