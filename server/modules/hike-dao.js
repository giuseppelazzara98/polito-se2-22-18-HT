class HikeDAO {

    sqlite = require('sqlite3');

    constructor(db) {
        this.db = db;
    }

    // close the connection to database
    closeHikeTable = () => {
        return new Promise((resolve, reject) => {
            this.db.close();
            resolve(true);
        });
    }

    // create the service table
    newHikeTable = () => {
        return new Promise((resolve, reject) => {
            const sql = "CREATE TABLE IF NOT EXISTS HIKE(id_hike INTEGER NOT NULL, id_start_place INTEGER NOT NULL, id_end_place INTEGER NOT NULL, description TEXT, length REAL, expected_time REAL, ascent INTEGER, difficulty TEXT, FOREIGN KEY(id_end_place) REFERENCES PLACE(id_place), FOREIGN KEY(id_start_place) REFERENCES PLACE(id_place), PRIMARY KEY(id_hike AUTOINCREMENT));";
            this.db.run(sql, (err) => {
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
    dropHikeTable = () => {
        return new Promise((resolve, reject) => {
            const sql = "DROP TABLE IF EXISTS HIKE;";
            this.db.run(sql, function (err) {
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
    getAllHikes = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT H.description, H.id_hike, P1.description AS START_PLACE, P2.description AS END_PLACE, H.length, H.expected_time, H.ascent, H.difficulty FROM HIKE H, PLACE P1, PLACE P2 WHERE H.id_start_place = P1.id_place AND H.id_end_place = P2.id_place;";
            this.db.all(sql, [], (err, rows) => {
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

}

module.exports = HikeDAO;