'use strict';

const sqlite = require("sqlite3");

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: '../HikeTracker.db'
    },
    useNullAsDefault: true,
});

const db = new sqlite.Database('HikeTracker.db', (err) => {
    if (err) throw err;
});

const hikeDAO = require('./hike-dao');

const hike_dao = new hikeDAO(db,knex);

module.exports = { hike_dao };