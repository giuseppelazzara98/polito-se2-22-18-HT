'use strict';

const express = require('express');
const router = express.Router();
const passport = require('../passport'); // auth middleware

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

//POST /api/newUser
router.post('/newUser', async (req, res) => {

	if (Object.keys(req.body).length === 0) {
		console.log('Empty body!');
		return res.status(422).json({ error: 'Empty body request' });
	}

	try {

		const result = await userDao.insertNewUser(
			req.body.user.email,
			req.body.password,
			req.body.user.role
		);

		return res.status(201).json(result);

	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: 'Service Unavailable' });
	}
});

module.exports = router;
