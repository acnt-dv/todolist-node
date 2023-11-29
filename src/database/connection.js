const mysql = require('mysql');
const {DATABASE, HOST_URL, PASS, USER} = require("../config");
const {sqlQueries} = require("./queries");

let connection = mysql.createConnection({
    host: HOST_URL,
    user: USER,
    password: PASS,
});

async function sqlInjection(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, results) {
            if (err)
                reject(err);
            resolve(results);
        });
    });
}

async function loadDb(){
    let response = await connectAndCheckDB();
    if(!response){
        await sqlInjection(sqlQueries.createDataBase(DATABASE));
        await sqlInjection(sqlQueries.createTable());
    }

    connection = mysql.createConnection({
        host: HOST_URL,
        user: USER,
        password: PASS,
        database: DATABASE
    });
}

async function connectAndCheckDB() {
    return new Promise((resolve, reject) => {
        connection.connect(async function (err) {
            if (err) reject(err);

            let dbExist = (await sqlInjection(`SHOW DATABASES LIKE \'${DATABASE}\'`)).length > 0;
            resolve(dbExist);
        });
    })
}

module.exports = {loadDb, sqlInjection}