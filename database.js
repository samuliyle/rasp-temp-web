const mysql = require('mysql');
const constants = require('./constants');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: constants.DB_URL,
    user: constants.DB_USERNAME,
    password: constants.DB_PASSWORD,
    database: constants.DB,
    debug: false
});

function executeQuery(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(error);
            } else {
                if (connection) {
                    connection.query(sql, (error, results, fields) => {
                        connection.release();
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                    });
                }
            }
        });
    });
}

function query(sql) {
    return new Promise((resolve, reject) => {
        executeQuery(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    query
}