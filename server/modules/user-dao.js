class UserDAO {
	sqlite = require('sqlite3');
	bcrypt = require('bcrypt');

	constructor(db) {
		this.db = db;
	}

	// close the connection to database
	closeTables = () => {
		return new Promise((resolve, reject) => {
			this.db.close();
			resolve(true);
		});
	};

	/* --------------------------------------------- TABLE USER --------------------------------------------- */

	/*

	// create the user table
	newUserTable = () => {
		return new Promise((resolve, reject) => {
			const sql =
				'CREATE TABLE IF NOT EXISTS USER(id_user INTEGER NOT NULL, id_role INTEGER NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, name TEXT NOT NULL, surname TEXT NOT NULL, PRIMARY KEY(id_user AUTOINCREMENT));';
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

	// drop the user table
	dropUserTable = () => {
		return new Promise((resolve, reject) => {
			const sql = 'DROP TABLE IF EXISTS USER;';
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

	*/

	// get User by ID
	getUserById = (id) => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM USER WHERE id_user = ?';
			this.db.get(sql, [id], (err, row) => {
				if (err) reject(err);
				else if (row === undefined) resolve(null);
				else {
					const user = { 
						id: row.id_user, 
						username: row.email, 
						role: row.role,
						verfied: row.verified, 
					};
					resolve(user);
				}
			});
		});
	};

	// get user, used for login purposes
	getUser = (email, password) => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT U.id_user, U.email, U.password, U.name, U.surname, R.description AS ROLE FROM USER U, ROLE R WHERE U.id_role = R.id_role AND U.email = ?';
			this.db.get(sql, [email], (err, row) => {
				if (err) {
					reject(err);
				} else if (row === undefined) {
					resolve(false);
				} else {

					const user = {
						id: row.id_user,
						username: row.email,
						name: row.name,
						surname: row.surname,
						role: row.ROLE,
						verfied: row.verified,
					};

					this.bcrypt.compare(password, row.password).then((result) => {
						if (result) resolve(user);
						else resolve(false);
					});
				}
			});
		});
	};

	insertNewUser = (email, name, surname, plainPassword, role, verified) => {
		return new Promise((resolve, reject) => {

			const sql = 'INSERT INTO USER (id_role, email, password, name, surname, verified) VALUES (?,?,?,?,?,?)';

			this.bcrypt.genSalt(10, (err, salt) => {
				// The bcrypt is used for encrypting password.
				this.bcrypt.hash(plainPassword, salt, (err, hash) => {
					if (err) {
						return console.log("Error in hashing password");
					}
					else {
						this.db.run(sql, [role, email, hash, name, surname, verified], function (err) {
							if (err) {
								console.log('Error running sql: ' + sql);
								console.log(err);
								reject(err);
							} else {
								resolve(this.lastID); //faccio tornare il l'id inserito
							}
						});
					}
				});
			});
		});
	};

	// update verified user
	updateVerifiedUser = (id) => {
		return new Promise((resolve, reject) => {
			const sql = 'UPDATE user SET verified = 1 WHERE id_user = ?';
			this.db.run(sql, [id], function (err) {
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

	/* --------------------------------------------- TABLE ROLES --------------------------------------------- */

	/*
	// create the role table
	newRoleTable = () => {
		return new Promise((resolve, reject) => {
			const sql =
				'CREATE TABLE IF NOT EXISTS ROLE(id_role INTEGER NOT NULL, description TEXT, PRIMARY KEY(id_role));';
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
	
	// drop the role table
	dropRoleTable = () => {
		return new Promise((resolve, reject) => {
			const sql = 'DROP TABLE IF EXISTS ROLE;';
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
	*/

	// get all roles
	getAllRoles = () => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM ROLE;';
			this.db.all(sql, [], (err, rows) => {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					const role = rows.map((el) => {
						return {
							id: el.id_role,
							description: el.description
						};
					});
					resolve(role);
				}
			});
		});
	};

}

module.exports = UserDAO;
