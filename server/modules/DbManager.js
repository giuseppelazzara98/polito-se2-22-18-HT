'use strict';

const sqlite = require('sqlite3');

const knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: 'HikeTracker.db'
	},
	useNullAsDefault: true
});

const db = new sqlite.Database('HikeTracker.db', (err) => {
	if (err) throw err;
});

const hikeDAO = require('./hike-dao');
const provinceDAO = require('./province-dao');
const placeDAO = require('./place-dao');
const userDAO = require('./user-dao');

const hike_dao = new hikeDAO(db, knex);
const province_dao = new provinceDAO(db);
const place_dao = new placeDAO(db);
const user_dao = new userDAO(db);

module.exports = { hike_dao, province_dao, place_dao, user_dao };
