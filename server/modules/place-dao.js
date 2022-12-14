class PlaceDAO {
	sqlite = require('sqlite3');

	constructor(db) {
		this.db = db;
	}

	/* ------------------- PLACE TABLE ------------------- */

	// close the connection to database
	closeTables = () => {
		return new Promise((resolve, reject) => {
			this.db.close();
			resolve(true);
		});
	};

	/*

	// create the place table
	newPlaceTable = () => {
		return new Promise((resolve, reject) => {

			const sql = "CREATE TABLE IF NOT EXISTS PLACE(id_place INTEGER NOT NULL, id_province INTEGER NOT NULL, id_municipality INTEGER NOT NULL, name TEXT, description TEXT, latitude REAL NOT NULL, longitude NUMERIC NOT NULL, type BLOB NOT NULL, PRIMARY KEY(id_place AUTOINCREMENT), FOREIGN KEY(id_province) REFERENCES PROVINCE(id_province), 	FOREIGN KEY("id_municipality") REFERENCES "MUNICIPALITY"("id_municipality"));";
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
		const sql =
			'SELECT * FROM PLACE WHERE id_province = ? AND type = "hut" OR type = "parking lot";';

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
							name: el.name,
							description: el.description,
							latitude: el.latitude,
							longitude: el.longitude,
							type: el.type
						};
					});
					resolve(places);
				}
			});
		});
	};

	getPlaceById = (place_id) => {
		const sql = 'SELECT * FROM PLACE WHERE id_place = ?;';
		return new Promise((resolve, reject) => {
			this.db.get(sql, [place_id], (err, row) => {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					if (row !== undefined) {
						const place = {
							id: row.id_place,
							name: row.name,
							description: row.description,
							lat: row.latitude,
							lon: row.longitude,
							type: row.type
						};
						resolve(place);
					} else {
						resolve(null);
					}
				}
			});
		});
	};

	insertPlace = (referencePoint, idProvince) => {
		return new Promise((resolve, reject) => {
			const sql =
				'INSERT INTO PLACE (id_province, name, description, latitude, longitude, type) VALUES (?, ?, ?, ?, ?, ?);';

			this.db.run(
				sql,
				[
					idProvince,
					referencePoint.name,
					referencePoint.description,
					referencePoint.lat,
					referencePoint.lon,
					referencePoint.type
				],
				function (err) {
					if (err) {
						console.log('Error running sql: ' + sql);
						console.log(err);
						reject(err);
					} else {
						resolve(this.lastID); //returns the entered ID
					}
				}
			);
		});
	};

	/* ------------------- PARKING_DATA ------------------- */

	/*
	// create the parking data table
	newParkingDataTable = () => {
		return new Promise((resolve, reject) => {

			const sql = "CREATE TABLE IF NOT EXISTS PARKING_DATA(id_place INTEGER NOT NULL, capacity INTEGER NOT NULL, PRIMARY KEY(id_place), FOREIGN KEY(id_place) REFERENCES PLACE(id_place));";
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

	// drop the parking data table
	dropParkingDataTable = () => {
		return new Promise((resolve, reject) => {
			const sql = "DROP TABLE IF EXISTS PARKING_DATA;";
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

	insertParkingLotData = (idPlace, capacity) => {
		return new Promise((resolve, reject) => {
			const sql =
				'INSERT INTO PARKING_DATA (id_place, capacity) VALUES ( ?, ?)';

			this.db.run(sql, [idPlace, capacity], function (err) {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					resolve(true);
				}
			});
		});
	};

	/* ---------------------- HUT DATA ---------------------- */

	/*

	// create the hut data table
	newHutDataTable = () => {
		return new Promise((resolve, reject) => {

			const sql = "CREATE TABLE IF NOT EXISTS HUT_DATA (id_place INTEGER NOT NULL, altitude INTEGER NOT NULL, n_beds INTEGER NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL, website TEXT, PRIMARY KEY(id_place), FOREIGN KEY(id_place) REFERENCES PLACE(id_place)
);";
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

	// drop the hut data table
	dropHutDataTable = () => {
		return new Promise((resolve, reject) => {
			const sql = "DROP TABLE IF EXISTS HUT_DATA;";
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

	insertHutData = (idPlace, hut) => {
		return new Promise((resolve, reject) => {
			const sql =
				'INSERT INTO HUT_DATA (id_place, altitude, n_beds, phone, email, website, image) VALUES (?, ?, ?, ?, ?, ?, ?)';

			this.db.run(
				sql,
				[
					idPlace,
					hut.altitude,
					hut.nBeds,
					hut.phone,
					hut.email,
					hut.website,
					hut.image
				],
				function (err) {
					if (err) {
						console.log('Error running sql: ' + sql);
						console.log(err);
						reject(err);
					} else {
						resolve(true);
					}
				}
			);
		});
	};
}

module.exports = PlaceDAO;
