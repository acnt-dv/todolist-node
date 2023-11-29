const {DATABASE, DATATABLE} = require("../config");

const DB_INFO = {
    dbName: DATABASE,
    tblName: DATATABLE,
}

let sqlQueries = {
    createDataBase: () => {
        return `CREATE DATABASE ${DATABASE}`;
    },
    createTable: () => {
        return `CREATE TABLE \`${DATABASE}\`.\`${DATATABLE}\` (
                    \`id\` INT NOT NULL,
                    \`items\` VARCHAR(250) NULL,
                    PRIMARY KEY (\`id\`));`
    },
    createColumn: (dbName, tableName, columnName) => {
        return `ALTER TABLE \`${dbName}\`.\`${tableName}\`
                ADD COLUMN \`${columnName}\` VARCHAR(250) NULL`;
    },
    dropColumn: (dbName, tableName, columnName) => {
        return `ALTER TABLE \`${dbName}\`.\`${tableName}\`
                DROP COLUMN \`${columnName}\``;
    },
    insertIntoTable: (tableName, columnName, id, description) => {
        return `INSERT INTO ${tableName} (id, ${columnName}) VALUES (${id}, '${description}')`;
    },
    selectFromTable: (tableName = DB_INFO.tblName, columnName = '*') => {
        return `SELECT ${columnName} FROM ${tableName}`;
    },
    selectId: (tableName = DB_INFO.tblName) => {
        return `SELECT id FROM ${tableName}`;
    }
}

module.exports = {sqlQueries, DB_INFO}