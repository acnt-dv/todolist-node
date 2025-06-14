const {DATABASE} = require("../config");

const DB_INFO = {
    dbName: DATABASE,
}

let sqlQueries = {
    createDataBase: () => {
        return `CREATE DATABASE ${DATABASE}`;
    },
    createTable: (tableName) => {
        return `CREATE TABLE \`${DATABASE}\`.\`${tableName}\` (
                    \`id\` INT NOT NULL,
                    \`items\` VARCHAR(250) NULL,
                    \`isDone\` BOOLEAN NOT NULL,
                    PRIMARY KEY (\`id\`));`
    },
    createUsersTable: () => {
        return `CREATE TABLE IF NOT EXISTS \`${DATABASE}\`.\`USERS\` (
                    \`id\` INT NOT NULL,
                    \`username\` VARCHAR(250) NULL,
                    \`password\` VARCHAR(250) NULL,
                    PRIMARY KEY (\`id\`));`
    },
    dropTable: (tableName) => {
        return `DROP TABLE \`${DATABASE}\`.\`${tableName}\``;

    },
    showAllTables: () => {
        return `SHOW TABLES`;
    },
    createColumn: (dbName, tableName, columnName) => {
        return `ALTER TABLE \`${dbName}\`.\`${tableName}\`
                ADD COLUMN \`${columnName}\` VARCHAR(250) NULL`;
    },
    dropColumn: (dbName, tableName, columnName) => {
        return `ALTER TABLE \`${dbName}\`.\`${tableName}\`
                DROP COLUMN \`${columnName}\``;
    },
    insertIntoTable: (tableName, id, description) => {
        return `INSERT INTO \`${tableName}\` (id, items, isDone) VALUES (${id}, '${description}', false)`;
    },
    insertIntoUsersTable: (id, userName, password) => {
        return `INSERT INTO \`USERS\` (id, userName, password) VALUES (${id}, '${userName}', ${password})`;
    },
    updateIntoTable: (tableName, id) => {
        return `UPDATE \`${DB_INFO.dbName}\`.\`${tableName}\`
            SET \`isDone\` = true
            WHERE \`id\` = ${id}`;
    },
    deleteFromTable: (tableName, id) => {
        return `DELETE FROM \`${DB_INFO.dbName}\`.\`${tableName}\`            
            WHERE \`id\` = ${id}`;
    },
    selectFromTable: (tableName) => {
        return `SELECT * FROM \`${tableName}\``;
    },
    selectUserFromTable: (userName) => {
        return `SELECT * FROM USERS WHERE userName = '${userName}'`;
    },
    checkDuplicateUserInTable: (userName) => {
        return `SELECT COUNT(*)  AS total FROM USERS WHERE userName = '${userName}'`;
    },
    selectId: (tableName) => {
        return `SELECT id FROM \`${tableName}\``;
    }
}

module.exports = {sqlQueries, DB_INFO}