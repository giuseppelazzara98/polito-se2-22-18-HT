class MunicipalityDAO {

    sqlite = require('sqlite3');

    constructor(db) {
        this.db = db;
    }

    // close the connection to database
    closeTables = () => {
        return new Promise((resolve, reject) => {
            this.db.close();
            resolve(true);
        });
    }

    /*

    // create the municipality table
    newMunicipalityTable = () => {
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

    // drop the municipality table
    dropMunicipalityTable = () => {
        return new Promise((resolve, reject) => {
            const sql = "DROP TABLE IF EXISTS MUNICIPALITY;";
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

    //TODO: add the municipality to the database

}

module.exports = MunicipalityDAO;