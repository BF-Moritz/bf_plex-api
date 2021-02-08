const express = require('express');
const PlexService = require('./services/plexService');

require('dotenv').config();

const app = express();

const plex = new PlexService();

app.get('/movies', (req, res) => {
	res.json(plex.moviesData);
});

app.get('/series', (req, res) => {
	res.json(plex.seriesData);
});

app.post('/movies', (req, res) => {
	if (!req.query.title) {
		res.status = 403;
		res.json({
			error: 'Missing title in query params.'
		});
	}
	const title = plex.moviesData.find((movie) => movie.title.toLowerCase().match(req.query.title.toLowerCase()));

	res.json({
		isIn: !!title,
		title
	});
});

app.post('/series', (req, res) => {
	if (!req.query.title) {
		res.status = 403;
		res.json({
			error: 'Missing title in query params.'
		});
	}
	const title = plex.seriesData.find((movie) => movie.title.toLowerCase().match(req.query.title.toLowerCase()));

	res.json({
		isIn: !!title,
		title
	});
});

app.listen(process.env.PORT || 6000);
