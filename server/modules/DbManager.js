'use strict';

const sqlite = require("sqlite3");

const db = new sqlite.Database('HikeTracker.db', (err) => {
    if(err) throw err;
});

const hikeDAO = require('./hike-dao');

const hike_dao = new hikeDAO(db);

module.exports = {hike_dao};