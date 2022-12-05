'use strict';

const express = require('express');
const router = express.Router();
const passport = require('../passport'); // auth middleware
const { check, body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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
		if (user.verified === 0) {
			return res.status(401).json({ error: 'User not verified. Please confirm your account through the link that we sent you on your email' });
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

			const userPrev = await userDao.getUser(req.body.email, req.body.password);

			if (userPrev !== false) {
				return res.status(409).json({ error: 'User already exists' });
			}

			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'hike.tracker18@gmail.com',
					pass: 'clvvccqtodlrnezi'
				}
			});

			const id_user = await userDao.insertNewUser(
				req.body.email,
				req.body.name,
				req.body.surname,
				req.body.password,
				req.body.id_role,
				0
			);

			const token = jwt.sign(
				{
					id_user: `${id_user}`
				},
				'ourSecretKey',
				{ expiresIn: '10m' }
			);


			const mailConfigurations = {
				// It should be a string of sender/server email
				from: 'hike.tracker18@gmail.com',

				to: `${req.body.email}`,

				// Subject of Email
				subject: 'Email Verification',

				// This would be the text of email body
				html:
					`<div><span>Hello <strong>${req.body.name} ${req.body.surname}</strong></span><span>!</span></div>
				<div><span></span></div>
				<div><span>Welcome to the Hike Tracker application!</span></div>
				<div><span> We just need to verify your email address before accessing our web site.</span></div>
				<div><span>Please follow the given <a href="http://localhost:3000/verify/${token}">link</a> to verify your email</span></div>
				<p>Best regards, the Hike Tracker team!</p>`

			};

			transporter.sendMail(mailConfigurations, function (error, info) {
				if (error) {
					throw Error(error);
				}
			});

			return res.status(201).json(id_user);

		} catch (err) {
			console.log(err);
			return res.status(503).json({ error: 'Service Unavailable' });
		}
	});

//PUT /api/verify/:token
router.put(
	'/verify/:token',
	[check('token').notEmpty().isString()],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log('Validation of token failed!');
			return res.status(422).json({ errors: errors.array() });
		}

		if (!req.params) {
			console.log('Error in request parameters!');
			return res.status(422).json({ error: 'Error in request parameters' });
		}

		try {
			let decoded = {};

			try {
				decoded = jwt.verify(req.params.token, 'ourSecretKey');
			} catch (err) {
				console.log('Token expired!');
				return res.status(401).json({ error: 'Token expired' });
			}

			const result = await userDao.updateVerifiedUser(decoded.id_user);

			res.status(200).json(result);
		} catch (err) {
			res.status(503).json({ error: 'Service Unavailable' });
		}
	}
);

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
