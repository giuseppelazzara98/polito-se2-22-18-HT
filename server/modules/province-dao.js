class ProvinceDAO {
	sqlite = require('sqlite3');

	constructor(db) {
		this.db = db;
	}

	// close the connection to database
	closeProvinceTable = () => {
		return new Promise((resolve, reject) => {
			this.db.close();
			resolve(true);
		});
	};

	/*

    // create the province table
    newProvinceTable = () => {
        return new Promise((resolve, reject) => {

            const sql = "CREATE TABLE IF NOT EXISTS PROVINCE(id_province INTEGER NOT NULL, name TEXT NOT NULL, abbreviation TEXT NOT NULL, PRIMARY KEY(id_province));";
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

    // drop the province table
    dropProvinceTable = () => {
        return new Promise((resolve, reject) => {
            const sql = "DROP TABLE IF EXISTS PROVINCE;";
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

	// get all provinces
	getAllProvinces = () => {
		const sql = 'SELECT * FROM PROVINCE;';

		return new Promise((resolve, reject) => {
			this.db.all(sql, [], (err, rows) => {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					const provinces = rows.map((el) => {
						return {
							id_province: el.id_province,
							name: el.name,
							abbreviation: el.abbreviation
						};
					});
					resolve(provinces);
				}
			});
		});
	};

	/*
	// get all provinces to file
	getAllProvincesToFile = () => {
		const sql = 'SELECT * FROM PROVINCE;';

		return new Promise((resolve, reject) => {
			this.db.all(sql, [], (err, rows) => {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					const provinces = rows.map((el) => {
						return {
							id_province: el.id_province,
							name: el.name,
							abbreviation: el.abbreviation
						};
					});
					fs.writeFileSync(
						'OldProvincesData.json',
						JSON.stringify(provinces),
						'utf-8'
					);
					resolve(provinces);
				}
			});
		});
	};

	newProvinceTable = () => {
		return new Promise((resolve, reject) => {
			const sql =
				'CREATE TABLE IF NOT EXISTS PROVINCE(id_province INTEGER NOT NULL, name TEXT NOT NULL, abbreviation TEXT NOT NULL,old_id_province INTEGER,PRIMARY KEY(id_province));';
			this.db.run(sql, (err) => {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				}
				resolve(this.lastID);
			});
		});
	};

	dropProvinceTable = () => {
		return new Promise((resolve, reject) => {
			const sql = 'DROP TABLE IF EXISTS PROVINCE;';
			this.db.run(sql, function (err) {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				}
				resolve(this.lastID);
			});
		});
	};

	insertProvincesFromFile = () => {
		return new Promise((resolve, reject) => {
			const sql =
				'INSERT INTO PROVINCE (id_province, name, abbreviation, old_id_province) VALUES (?, ?, ?, ?);';
			const rawData = fs.readFileSync('./finalProvinceData.json');
			const provinces = JSON.parse(rawData);
			provinces.forEach((province) => {
				this.db.run(
					sql,
					[
						province.province_id,
						province.province,
						province.prov_abbreviation,
						province.oldProvinceId
					],
					function (err) {
						if (err) {
							console.log(err);
							reject(err);
						} else {
							resolve();
						}
					}
				);
			});
		});
	};
	*/
}

module.exports = ProvinceDAO;
