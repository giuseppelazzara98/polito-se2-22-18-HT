'use strict';

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('HireTracker.db', (err) => {
    if (err) {
        throw err;
    }
});
