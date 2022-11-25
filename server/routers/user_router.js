'use strict';

const express = require('express');
const router = express.Router();
const passport = require('../passport'); // auth middleware
const { check, body, validationResult } = require('express-validator');

const userDao = require('../modules/DbManager').user_dao; // module for accessing the users in the DB

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();

	return res.status(401).json({ error: 'User not authenticated' });
};

/*** Users APIs ***/

// POST /sessions
// login
router.post('/sessions', function (req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) {
			// display wrong login messages
			return res.status(401).json(info);
		}
		// success, perform the login
		req.login(user, (err) => {
			if (err) return next(err);

			// req.user contains the authenticated user, we send all the user info back
			// this is coming from userDao.getUser()
			return res.json(req.user);
		});
	})(req, res, next);
});

// DELETE /sessions/current
// logout
router.delete('/sessions/current', (req, res) => {
	req.logout(() => {
		res.end();
	});
});

// GET /sessions/current
// check whether the user is logged in or not
router.get('/sessions/current', (req, res) => {
	if (req.isAuthenticated()) {
		res.status(200).json(req.user);
	} else {
		res.status(401).end();
	}
});

/* Example of body:

{
	"email": "hiker3@gmail.com",
	"name": "Paolo",
	"surname": "Bari", 
	"password": "password",
	"id_role": "1"
}

*/

//POST /api/newUser
router.post('/newUser',
	body('email').isEmail(),
	body('name').isString().isLength({ max: 50 }),
	body('surname').isString().isLength({ max: 50 }),
	body('password').isString().isLength({ max: 255 }),
	body('id_role').isInt({ min: 1, max: 4 }),
	async (req, res, next) => {

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

			const userPrev = await userDao.getUser(req.body.email, req.body.password);

			if (userPrev !== false) {
				return res.status(409).json({ error: 'User already exists' });
			}

			await userDao.insertNewUser(
				req.body.email,
				req.body.name,
				req.body.surname,
				req.body.password,
				req.body.id_role
			);

			const user = await userDao.getUser(req.body.email, req.body.password);

			passport.authenticate('local', (err, info) => {
				if (err) return next(err);
				if (!user) {
					// display wrong login messages
					return res.status(401).json(info);
				}
				// success, perform the login
				req.login(user, (err) => {
					if (err) return next(err);

					// req.user contains the authenticated user, we send all the user info back
					// this is coming from userDao.getUser()
					return res.status(201).json(req.user);
				});
			})(req, res, next);

		} catch (err) {
			console.log(err);
			return res.status(503).json({ error: 'Service Unavailable' });
		}
	});

//GET /api/roles
router.get('/roles', async (req, res) => {
	try {
		const roles = await userDao.getAllRoles();
		res.status(200).json(roles);
	} catch (err) {
		res.status(500).json({ error: "Internal Server Error" });
	}
}
);

module.exports = router;
