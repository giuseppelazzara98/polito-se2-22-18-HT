class HikeDAO {

	sqlite = require('sqlite3');

	constructor(db, knex) {
		this.db = db;
		this.knex = knex;
	}

	// close the connection to database
	closeTables = () => {
		return new Promise((resolve, reject) => {
			this.db.close();
			resolve(true);
		});
	}

	/* --------------------------------------------- TABLE HIKE --------------------------------------------- */

	/*

	// create the hike table
	newHikeTable = () => {
		return new Promise((resolve, reject) => {

			const sql = "CREATE TABLE IF NOT EXISTS HIKE(id_hike INTEGER NOT NULL, id_start_place INTEGER NOT NULL, id_end_place INTEGER NOT NULL, id_province INTEGER NOT NULL, id_municipality INTEGER NOT NULL, name TEXT, description TEXT, length REAL, expected_time REAL, ascent INTEGER, difficulty INTEGER, gpx TEXT, FOREIGN KEY(id_end_place) REFERENCES PLACE(id_place), FOREIGN KEY(id_start_place) REFERENCES PLACE(id_place), FOREIGN KEY(id_province) REFERENCES PROVINCE(id_province) , 	FOREIGN KEY("id_municipality") REFERENCES "MUNICIPALITY"("id_municipality"), PRIMARY KEY(id_hike AUTOINCREMENT));";
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

	// drop the hike table
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

	*/

	/* 
		Difficulties -> Integer:

		0 -> tourist
		1 -> hiker
		2 -> professional hiker

	*/

	// get all filtered hikes
	getAllFilteredHikes = (filters) => {
		let sql = this.knex
			.select(
				'HIKE.name',
				'HIKE.id_hike',
				'HIKE.description',
				'P1.name as START_PLACE',
				'P2.name as END_PLACE',
				'PR.name as PROVINCE',
				'HIKE.length',
				'HIKE.expected_time',
				'HIKE.ascent',
				'HIKE.difficulty',
				'HIKE.gpx'
			)
			.from('HIKE')
			.join('PLACE as P1', { 'P1.id_place': 'HIKE.id_start_place' })
			.join('PLACE as P2', { 'P2.id_place': 'HIKE.id_end_place' })
			.join('PROVINCE as PR', { 'PR.id_province': 'HIKE.id_province' });

		if (filters.province !== null) {
			sql = sql.where('HIKE.id_province', filters.province);
		}
		if (filters.difficulty.length !== 0) {
			sql = sql.whereIn('HIKE.difficulty', filters.difficulty);
		}
		if (filters.exp_time !== null) {
			sql = sql.whereBetween('HIKE.expected_time', [
				filters.exp_time.min,
				filters.exp_time.max
			]);
		}
		if (filters.length !== null) {
			sql = sql.whereBetween('HIKE.length', [
				filters.length.min,
				filters.length.max
			]);
		}
		if (filters.ascent !== null) {
			sql = sql.whereBetween('HIKE.ascent', [
				filters.ascent.min,
				filters.ascent.max
			]);
		}

		//We can decide to do the query with knex or with sqlite

		/*return new Promise((resolve, reject) => {
			sql.then((rows) => {
				const hikes = rows.map((el) => {
					return {
						name: el.name,
						key: el.id_hike,
						description: el.description,
						start_place: el.START_PLACE,
						end_place: el.END_PLACE,
						province: el.PROVINCE,
						length: el.length,
						expected_time: el.expected_time,
						ascent: el.ascent,
						difficulty: el.difficulty,
						gpx: el.gpx
					}
				});
				resolve(hikes);
			}).catch((err) => {
				console.log(err);
				reject(err);
			});
		});*/

		return new Promise((resolve, reject) => {
			this.db.all(sql.toString(), [], (err, rows) => {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					const hikes = rows.map((el) => {
						return {
							name: el.name,
							key: el.id_hike,
							description: el.description,
							start_place: el.START_PLACE,
							end_place: el.END_PLACE,
							province: el.PROVINCE,
							length: el.length,
							expected_time: el.expected_time,
							ascent: el.ascent,
							difficulty: el.difficulty,
							gpx: el.gpx
						};
					});
					resolve(hikes);
				}
			});
		});
	};

	insertHike = (hike, idStart, idEnd) => {
		return new Promise((resolve, reject) => {
			const sql =
				'INSERT INTO HIKE (name, id_start_place, id_end_place, id_province, description, length, expected_time, ascent, difficulty, gpx) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

			this.db.run(
				sql,
				[
					hike.title,
					idStart,
					idEnd,
					hike.province,
					hike.description,
					hike.length,
					hike.expectedTime,
					hike.ascent,
					hike.difficulty,
					hike.gpxData
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

	getHikeById = (id_hike) => {
		return new Promise((resolve, reject) => {
			const sql = "SELECT * FROM HIKE WHERE id_hike = ?;";
			this.db.get(sql, [id_hike], function (err, row) {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					if (row !== undefined) {
						const hike = {
							name: row.name,
							key: row.id_hike,
							description: row.description,
							id_start_place: row.id_start_place,
							id_end_place: row.id_end_place,
							province: row.id_province,
							length: row.length,
							expected_time: row.expected_time,
							ascent: row.ascent,
							difficulty: row.difficulty,
							gpx: row.gpx
						}
						resolve(hike);
					} else {
						resolve(null);
					}
				}
			});
		});
	};

	/* --------------------------------------------- TABLE HIKE_PLACE --------------------------------------------- */

	/*

	// create the hike_place table
	newHikePlaceTable = () => {
		return new Promise((resolve, reject) => {

			const sql = "CREATE TABLE IF NOT EXISTS HIKE_PLACE(id_hike INTEGER NOT NULL, id_place INTEGER NOT NULL, sort INTEGER, PRIMARY KEY(id_hike, id_place), FOREIGN KEY(id_hike) REFERENCES HIKE(id_hike), FOREIGN KEY(id_place) REFERENCES PLACE(id_place));";
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

	// drop the hike_place table
	dropHikePlaceTable = () => {
		return new Promise((resolve, reject) => {
			const sql = "DROP TABLE IF EXISTS HIKE_PLACE;";
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

	insertHikePlace = (id_hike, id_reference_point) => {
		return new Promise((resolve, reject) => {
			const sql =
				'INSERT INTO HIKE_PLACE (id_hike, id_place) VALUES (?, ?)';

			this.db.run(sql, [id_hike, id_reference_point], function (err) {
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

	getStartEndPoints = (id_hike) => {
		return new Promise((resolve, reject) => {
			const sql = "SELECT id_start_place, id_end_place, gpx FROM HIKE H WHERE id_hike = ?";
			this.db.get(sql, [id_hike], function (err, row) {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					if (row !== undefined) {
						const starEndPoints = {
							id_start_place: row.id_start_place,
							id_end_place: row.id_end_place
						};
						resolve(starEndPoints);
					} else {
						resolve(null);
					}
				}
			});
		});
	};

	getReferencePoints = (id_hike) => {
		return new Promise((resolve, reject) => {
			const sql = "SELECT P.id_place, P.name, P.description, P.latitude, P.longitude, P.type  FROM HIKE H,  HIKE_PLACE HP, PLACE P WHERE H.id_hike = ? AND H.id_hike = HP.id_hike AND P.id_place = HP.id_place ";
			this.db.all(sql, [id_hike], function (err, rows) {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					const referencePoints = rows.map((el) => {
						return {
							id_place: el.id_place,
							name: el.name,
							description: el.description,
							latitude: el.latitude,
							longitude: el.longitude,
							type: el.type
						};
					});
					resolve(referencePoints);
				}
			});
		});
	};
}

module.exports = HikeDAO;