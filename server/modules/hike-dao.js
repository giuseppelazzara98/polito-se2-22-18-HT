'use strict';

const sqlite = require('sqlite3');

// open the connection to database
const db = new sqlite.Database('HikeTracker.db', (err) => {
    if (err) {
        throw err;
    }
});

// close the connection to database
exports.closeHikeTable = () => {
    return new Promise((resolve, reject) => {
        db.close();
        resolve(true);
    });
}

// create the service table
exports.newHikeTable = () => {
    return new Promise((resolve, reject) => {
        const sql = "CREATE TABLE IF NOT EXISTS HIKE(id_hike INTEGER NOT NULL, id_start_place INTEGER NOT NULL, id_end_place INTEGER NOT NULL, description TEXT, length REAL, expected_time REAL, ascent INTEGER, difficulty TEXT, FOREIGN KEY(id_end_place) REFERENCES PLACE(id_place), FOREIGN KEY(id_start_place) REFERENCES PLACE(id_place), PRIMARY KEY(id_hike AUTOINCREMENT));";
        db.run(sql, (err) => {
            if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

// drop the service table
exports.dropHikeTable = () => {
    return new Promise((resolve, reject) => {
        const sql = "DROP TABLE IF EXISTS HIKE;";
        db.run(sql, function (err) {
            if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
            }
            resolve(this.lastID);
        })

    });
}

// get all hikes
exports.getAllHikes = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT H.description, H.id_hike, P1.description AS START_PLACE, P2.description AS END_PLACE, H.length, H.expected_time, H.ascent, H.difficulty FROM HIKE H, PLACE P1, PLACE P2 WHERE H.id_start_place = P1.id_place AND H.id_end_place = P2.id_place;";
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log('Error running sql: ' + sql);
                console.log(err);
                reject(err);
            } else {
                const services = rows.map((el) => {
                    return {
                        name: el.description,
                        key: el.id_hike,
                        start_place: el.START_PLACE,
                        end_place: el.END_PLACE,
                        length: el.length,
                        expected_time: el.expected_time,
                        ascent: el.ascent,
                        difficulty: el.difficulty
                    }
                });
                resolve(services);
            }
        });
    });
};