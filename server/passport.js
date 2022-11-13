'use strict';

const passport = require('passport');  //Authentication middleware
const LocalStrategy = require('passport-local').Strategy;   //Username and password for login

const userDao = require('./modules/DbManager').user_dao; // module for accessing the users in the DB

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

module.exports = passport;