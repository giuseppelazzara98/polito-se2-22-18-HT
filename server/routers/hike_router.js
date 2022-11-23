'use strict';

const express = require('express');
const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const hikeDao = require('../modules/DbManager').hike_dao;
const placeDao = require('../modules/DbManager').place_dao;

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	return res.status(401).json({ error: 'User not authenticated' });
};

/*** Hikes APIs ***/

// Examples of body:
/*
	{
		"province": null,
		"difficulty": [1],
		"exp_time": { "min": 5.2, "max": 7.0 },
		"length": { "min": 0.0, "max": 15.7 },
		"ascent": { "min": 500, "max": 2000 }
	}
	{
		"province": 1,
		"difficulty": [1,2],
		"exp_time": { "min": 5.6, "max": 9.0 },
		"length": { "min": 0.0, "max": 15.7 },
		"ascent": { "min": 500, "max": 2900 }
	}
*/

//POST /api/hikes
router.post('/hikes',
	body('difficulty').isArray(),
	async (req, res) => {

		if (Object.keys(req.body).length === 0) {
			console.log('Empty body!');
			return res.status(422).json({ error: 'Empty body request' });
		}

		if (Object.keys(req.body).length !== 5) {
			console.log('Data not formatted properly!');
			return res.status(422).json({ error: 'Data not formatted properly' });
		}

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log("Error in body!");
			return res.status(422).json({ errors: errors.array() });
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

/*
	{
		"title":"Test1",
		"province":1,
		"length":345,
		"expectedTimeString":"12h",
		"expectedTime":12,
		"ascent":123,
		"difficulty":2,
		"startPoint":9,
		"endPoint":5,
		"referencePoints":[],
		"gpxData":"...",
		"description":"Test1"
	}
*/

//POST /api/newHike
router.post('/newHike',
	isLoggedIn,
	body('title').isString().isLength({ max: 300 }),
	body('province').notEmpty().isInt({ min: 1 }),
	body('length').isFloat({ min: 0.0 }),
	body('expectedTimeString').isString().isLength({ max: 20 }),
	body('expectedTime').isFloat({ min: 0.0 }),
	body('ascent').isInt({ min: 0 }),
	body('difficulty').isInt({ min: 0, max: 2 }),
	body('startPoint').notEmpty().isInt({ min: 1 }),
	body('endPoint').notEmpty().isInt({ min: 1 }),
	body('referencePoints').isArray(),
	body('gpxData').isString(),
	body('description').isString().isLength({ max: 1000 }),
	async (req, res) => {

		if (Object.keys(req.body).length === 0) {
			console.log('Empty body!');
			return res.status(422).json({ error: 'Empty body request' });
		}

		if (Object.keys(req.body).length !== 12 || !(req.body.title && req.body.expectedTimeString && req.body.referencePoints && req.body.gpxData && req.body.description)) {
			console.log('Data not formatted properly!');
			return res.status(422).json({ error: 'Data not formatted properly' });
		}

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log("Error in body!");
			return res.status(422).json({ errors: errors.array() });
		}

		try {


			// insert in hike-place table, cycling on reference points
			for (let i = 0; i < req.body.referencePoints.length; i++) {

				let referencePoint = req.body.referencePoints[i];

				let place_ok = await placeDao.getPlaceById(referencePoint);

				if (place_ok !== null) {
					await hikeDao.insertHikePlace(result, referencePoint, i + 1);
				}
				else {
					console.log("Place not found!");
					return res.status(404).json({ error: 'Not Found' });
				}
			}

			const result = await hikeDao.insertHike(req.body);

			return res.status(201).json(result);
		} catch (err) {
			console.log(err);
			return res.status(503).json({ error: 'Service Unavailable' });
		}
	});

module.exports = router;
