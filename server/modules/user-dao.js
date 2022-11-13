class UserDAO {
	sqlite = require('sqlite3');
	bcrypt = require('bcrypt');

	constructor(db) {
		this.db = db;
	}

	// close the connection to database
	closeUserTable = () => {
		return new Promise((resolve, reject) => {
			this.db.close();
			resolve(true);
		});
	};

	// create the user table
	newUserTable = () => {
		return new Promise((resolve, reject) => {
			const sql =
				'CREATE TABLE IF NOT EXISTS USER(id_user INTEGER NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL, PRIMARY KEY(id_user));';
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

	// get User by ID
	getUserById = (id) => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM USER WHERE id_user = ?';
			this.db.get(sql, [id], (err, row) => {
				if (err) reject(err);
				else if (row === undefined) resolve({ error: 'User not found.' });
				else {
					const user = { id: row.id_user, username: row.email, role: row.role };
					resolve(user);
				}
			});
		});
	};

	// get user, used for login purposes
	getUser = (email, password) => {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM user WHERE email = ?';
			this.db.get(sql, [email], (err, row) => {
				if (err) {
					reject(err);
				} else if (row === undefined) {
					resolve(false);
				} else {
					const user = { id: row.id_user, username: row.email, role: row.role };
					this.bcrypt.compare(password, row.password).then((result) => {
						if (result) resolve(user);
						else resolve(false);
					});
				}
			});
		});
	};

	insertNewUser = (email, password, role) => {
		return new Promise((resolve, reject) => {
			const sql ='INSERT INTO USER (email, password, role) VALUES (?, ?, ?)';
			this.db.run(sql, [email, password, role], function (err) {
				if (err) {
					console.log('Error running sql: ' + sql);
					console.log(err);
					reject(err);
				} else {
					resolve(this.lastID); //faccio tornare il l'id inserito
				}
			});
		});
	};

}

module.exports = UserDAO;
