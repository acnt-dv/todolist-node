let mysql = require('mysql');

const dbName = 'todoList';
const tableName = 'list';
const columnName = 'روزانه'
const description = 'لیست روزانه من';

let connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: dbName
});

let sqlQueries = {
    createTable: `CREATE TABLE ${tableName} (${columnName} VARCHAR(255))`,
    insertIntoTable: `INSERT INTO ${tableName} (${columnName}) VALUES ('${description}')`,
    selectFromTable: `SELECT ${columnName} FROM ${tableName}`,
}

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    // createDataBase(dbName);
    // sqlInjection(sqlQueries.createTable);
    sqlInjection(sqlQueries.insertIntoTable);
    sqlInjection(sqlQueries.selectFromTable);
});

function createDataBase(dbName) {
    connection.query(`CREATE DATABASE ${dbName}`, function (err, result) {
        if (err) throw err;
        console.log(`Database created, ${JSON.stringify(result)}`);
    });
}

function sqlInjection(query) {
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log(`Query executed, ${JSON.stringify(result)}`);
    });
}