'use strict';

const express = require('express');
//const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const hikeDao = require('../modules/DbManager').hike_dao;

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()){ 
		return next();
	}

	return res.status(401).json({ error: 'User not authenticated' });
};

/*** Hikes APIs ***/

// Examples of body:
/*
	{
		"province": null,
		"difficulty": ["tourist"],
		"exp_time": { "min": 5.2, "max": 7.0 },
		"length": { "min": 0.0, "max": 15.7 },
		"ascent": { "min": 500, "max": 2000 }
	}
	{
		"province": 1,
		"difficulty": ["professional hiker"],
		"exp_time": { "min": 5.6, "max": 9.0 },
		"length": { "min": 0.0, "max": 15.7 },
		"ascent": { "min": 500, "max": 2900 }
	}
*/

//POST /api/hikes
router.post('/hikes', async (req, res) => {
	if (Object.keys(req.body).length === 0) {
		console.log('Empty body!');
		return res.status(422).json({ error: 'Empty body request' });
	}

	if (Object.keys(req.body).length !== 5) {
		console.log('Data not formatted properly!');
		return res.status(422).json({ error: 'Data not formatted properly' });
	}

	try {
		const hikes = await hikeDao.getAllFilteredHikes(req.body);

		const unique = (value, index, self) => {
			return self.indexOf(value) === index;
		};

		const distinct_times = hikes.map((el) => el.expected_time).filter(unique);
		const distinct_lengths = hikes.map((el) => el.length).filter(unique);
		const distinct_ascents = hikes.map((el) => el.ascent).filter(unique);

		const result = {
			hikes: hikes,
			distinct_times: distinct_times,
			distinct_lengths: distinct_lengths,
			distinct_ascents: distinct_ascents
		};

		return res.status(200).json(result);
	} catch (err) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

//POST /api/newHike
router.post('/newHike',
	//isLoggedIn,
	async (req, res) => {

		if (Object.keys(req.body).length === 0) {
			console.log('Empty body!');
			return res.status(422).json({ error: 'Empty body request' });
		}

		if (Object.keys(req.body).length !== 12) {
			console.log('Data not formatted properly!');
			return res.status(422).json({ error: 'Data not formatted properly' });
		}

		try {

			const result = await hikeDao.insertHike(req.body);
			// insert in hike-place table, cycling on reference points

			for (let i = 0; i < req.body.referencePoints.length; i++) {
				//insertHikePlace(id_hike, id_reference_point, order)
				let result2 = await hikeDao.insertHikePlace(
					result,
					req.body.referencePoints[i],
					i + 1
				);
			}

			return res.status(201).json(result);
		} catch (err) {
			console.log(err);
			return res.status(503).json({ error: 'Service Unavailable' });
		}
	});

module.exports = router;
