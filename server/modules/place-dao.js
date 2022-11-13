class PlaceDAO {

    sqlite = require('sqlite3');

    constructor(db) {
        this.db = db;
    }

    // close the connection to database
    closePlaceTable = () => {
        return new Promise((resolve, reject) => {
            this.db.close();
            resolve(true);
        });
    }

    /*

    // create the place table
    newPlaceTable = () => {
        return new Promise((resolve, reject) => {

            const sql = "CREATE TABLE IF NOT EXISTS PLACE(id_place INTEGER NOT NULL, id_province INTEGER, description TEXT, latitude REAL NOT NULL, longitude NUMERIC NOT NULL, type BLOB NOT NULL, PRIMARY KEY(id_place AUTOINCREMENT), FOREIGN KEY(id_province) REFERENCES PROVINCE(id_province));";
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

    // drop the place table
    dropPlaceTable = () => {
        return new Promise((resolve, reject) => {
            const sql = "DROP TABLE IF EXISTS PLACE;";
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

    */

    // get all places by province id
    getAllPlacesByProvinceId = (province_id) => {

        const sql = "SELECT * FROM PLACE WHERE id_province = ?;";

        return new Promise((resolve, reject) => {
            this.db.all(sql, [province_id], (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    console.log(err);
                    reject(err);
                } else {

                    const places = rows.map((el) => {
                        return {
                            id_place: el.id_place,
                            description: el.description,
                            latitude: el.latitude,
                            longitude: el.longitude,
                            type: el.type
                        }
                    });
                    resolve(places);
                }
            });
        });
    };

	getPlaceById = (place_id) => {
		const sql = 'SELECT * FROM PLACE WHERE id_place = ?;';
		console.log(place_id);
		return new Promise((resolve, reject) => {
			this.db.get(sql, [place_id], (err, row) => {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					const place = {
						id_place: row.id_place,
						name: row.name,
						description: row.description,
						latitude: row.latitude,
						longitude: row.longitude,
						type: row.type
					};

					resolve(place);
				}
			});
		});
	};
}

module.exports = PlaceDAO;
