const {sqlQueries, DB_INFO} = require('../database/queries');
const {sqlInjection} = require('../database/connection');

async function insertColumn(columnName) {
    try {
        await sqlInjection(sqlQueries.createColumn(DB_INFO.dbName, DB_INFO.tblName, columnName?.category));
        return 'category created successfully.'
    } catch (e) {
        throw new Error(`Reading failed with error: ${e}`);
    }
}

async function dropColumn(columnName) {
    try {
        await sqlInjection(sqlQueries.dropColumn(DB_INFO.dbName, DB_INFO.tblName, columnName?.category));
        return 'category deleted successfully.'
    } catch (e) {
        throw new Error(`Reading failed with error: ${e}`);
    }
}

async function readData(headers) {
    try {
        return await sqlInjection(sqlQueries.selectFromTable(DB_INFO.tblName, headers?.category));
    } catch (e) {
        throw new Error(`Reading failed with error: ${e}`);
    }
}

async function writeData(storageData) {
    try {
        await sqlInjection(sqlQueries.insertIntoTable(DB_INFO.tblName, storageData?.columnName, storageData?.id, storageData?.body));
        return ('File manipulated successfully...');
    } catch (e) {
        throw new Error(`Writing failed with error: ${e}`);
    }
}

async function insertData(insertData) {
    try {
        let id = await getLastIndexOfList();
        let storageData = {columnName: insertData?.category, id: id, body: insertData.body}
        return writeData(storageData);
    } catch (e) {
        return (`Insert failed with error: ${e}`);
    }
}

async function updateData(updateData) {
    try {
        // let updateDataEntry = JSON.parse(updateData);
        let storageData = await readData();

        storageData = storageData.filter(x => x.id !== updateData.id);
        storageData.push(updateData);

        return writeData(storageData);
    } catch (e) {
        return (`Update failed with error: ${e}`);
    }
}

async function deleteData(deleteItem) {
    try {
        // let deleteItemEntry = JSON.parse(deleteItem);
        let storageData = await readData();

        storageData = storageData.filter(x => x.id !== deleteItem.id);

        return writeData(storageData);
    } catch (e) {
        return (`Delete failed with error: ${e}`);
    }
}

async function getLastIndexOfList() {
    try {
        let lastData = await fetchLastId();
        return ++sortData(lastData)[0].id;
    } catch (e) {
        throw new Error(`Id declaration failed with error: ${e}`);
    }
}

async function fetchLastId() {
    try {
        console.log('Reading file ...');
        return await sqlInjection(sqlQueries.selectId());
    } catch (e) {
        throw new Error(`Reading failed with error: ${e}`);
    }
}

function sortData(list) {
    return list.sort((a, b) => b.id - a.id);
}

async function checkForDuplicatedEntry(list, entry) {
    return list.filter(x => x.id === entry.id);
}

module.exports = {insertColumn, dropColumn, readData, insertData, updateData, deleteData}


