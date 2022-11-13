const express = require('express');
const router = express.Router();

const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions

const userDao = require('../modules/DbManager').user_dao; // module for accessing the users in the DB

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(
	new LocalStrategy(function (username, password, done) {
		userDao.getUser(username, password).then((user) => {
			if (!user) {
				return done(null, false, {
					message: 'Incorrect username and / or password.'
				});
			}
			return done(null, user);
		});
	})
);

// serialize and de-serialize the user (user object <-> session)
// we serialize the user and we store it in the session
passport.serializeUser((user, done) => {
	done(null, user);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((user, done) => {
	done(null, user);
});

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();

	return res.status(401).json({ error: 'User not authenticated' });
};

// set up the session
router.use(
	session({
		// by default, Passport uses a MemoryStore to keep track of the sessions
		secret:
			'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
		resave: false,
		saveUninitialized: false
	})
);

// then, init passport
router.use(passport.initialize());
router.use(passport.session());

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
	req.logout(() => { res.end(); });
});

// GET /sessions/current
// check whether the user is logged in or not
router.get('/sessions/current', (req, res) => {
	if (req.isAuthenticated()) {
		res.status(200).json(req.user);
	}
	else {
		res.status(401).json({ error: 'User not authenticated' });
	}
});

//POST /api/newUser
router.post('/newUser', async (req, res) => {
	if (Object.keys(req.body).length === 0) {
		console.log('Empty body!');
		return res.status(422).json({ error: 'Empty body request' });
	}

	try {

		console.log('req.body.user:' + req.body.user);
		//Qui cripto la password 
		let password;

		bcrypt.genSalt(10, function (err, Salt) {
			// The bcrypt is used for encrypting password.
			bcrypt.hash(password, Salt, function (err, hash) {
				if (err) {
					return console.log('Cannot encrypt the password');
				}
				password = hash;
			})
		})

		const result = await userDao.insertNewUser(req.body.user.email, password, req.body.user.role);
		return res.status(201).json(result);

	} catch (err) {
		console.log(err);
		return res.status(503).json({ error: 'Service Unavailable' });
	}
});

module.exports = router;
