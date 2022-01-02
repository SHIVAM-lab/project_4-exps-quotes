const path = require('path');
const request = require('request');
//const { resolve } = require('path/posix');
//var connection = require('./connection.js');
const {
    connection
} = require('./connection.js');
module.exports = {
    query_exec: function (query) {

        return new Promise((resolve, reject) => {

            connection.query(query, (err, result) => {
                if (err) {
                    throw err;
                }

                return resolve(result);
            });
        });
    },
    query_insert: function (column, values, table) {

        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO ${table} (${column}) VALUES (?)`, [values], (err, result) => {
                if (err) {

                    throw err;
                }

                return resolve(result);
            });
        });
    },

    query_update: function (where, data, table) {
        // console.log(where,data,table);

        return new Promise((resolve, reject) => {
            // console.log(where,data,table);
            connection.query("UPDATE " + table + " set ? where " + where, [data], function (err, result) {
                if (err) {

                    throw err;
                }

                return resolve(result);
            });
        });
    },
    api_call: function (options) {
        return new Promise((resolve, reject) => {

            request(options, async (error, response) => {
                if (error) {
                    reject(error);
                }
                console.log(response.body);
                return resolve(response.body);

            });




        });
    }
};