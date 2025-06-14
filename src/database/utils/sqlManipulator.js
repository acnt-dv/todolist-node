const { sqlQueries, DB_INFO } = require('../queries');
const { sqlInjection } = require('../connection');

async function insertCategory(columnName) {
    try {
        await sqlInjection(sqlQueries.createTable(columnName?.category));

        return JSON.stringify({
            status: 200,
            data: 'category created successfully.',
            errorMessage: null
        });
    } catch (e) {
        return JSON.stringify({
            status: 204,
            data: null,
            errorMessage: `Category creation failed with error: ${e}`
        });
    }
}

async function insertUser(userFields) {
    try {
        await sqlInjection(sqlQueries.createUsersTable());

        const id = await getLastIndexOfList('USERS');
        const totalData = await sqlInjection(sqlQueries.checkDuplicateUserInTable(userFields?.userName));
        const isDuplicated = totalData[0].total > 0;

        if (isDuplicated) return (JSON.stringify({
            status: 409,
            data: null,
            errorMessage: 'User name is taken'
        }));

        await sqlInjection(sqlQueries.insertIntoUsersTable(id, userFields?.userName, userFields?.password));

        return JSON.stringify({
            status: 200,
            data: 'signed up succesfully.',
            errorMessage: null
        });
    } catch (error) {
        return JSON.stringify({
            status: 500,
            data: null,
            errorMessage: `sign up failed with error: ${error}`
        });
    }
}

async function login(loginInfo) {
    try {
        const userNotFound = JSON.stringify({
            status: 404,
            data: null,
            errorMessage: 'user not found!'
        });

        const userListResult = await sqlInjection(sqlQueries.selectUserFromTable(loginInfo?.userName));

        if (userListResult?.length < 1) return userNotFound;

        const plainArray = JSON.parse(JSON.stringify(userListResult?.[0]));

        if (plainArray?.password === loginInfo?.password) {
            return JSON.stringify({
                status: 200,
                data: 'loged in succesfully.',
                errorMessage: null
            });
        } else {
            return userNotFound;
        }
    } catch (error) {
        return JSON.stringify({
            status: 500,
            data: null,
            errorMessage: `login failed with error: ${error}`
        });
    }
}

async function deleteCategory(columnName) {
    try {
        await sqlInjection(sqlQueries.dropTable(columnName?.category));

        return JSON.stringify({
            status: 200,
            data: 'category deleted successfully.',
            errorMessage: null
        });
    } catch (e) {
        return JSON.stringify({
            status: 204,
            data: null,
            errorMessage: `Category deletion failed with error: ${e}`
        });
    }
}

async function readList(headers) {
    try {
        return {
            status: 200,
            data: await sqlInjection(sqlQueries.showAllTables()),
            errorMessage: null
        };
    } catch (e) {
        return {
            status: 204,
            data: null,
            errorMessage: `Reading failed with error: ${e}`
        };
    }
}

async function readData(headers) {
    try {
        return {
            status: 200,
            data: await sqlInjection(sqlQueries.selectFromTable(headers?.category)),
            errorMessage: null
        };
    } catch (e) {
        return {
            status: 204,
            data: null,
            errorMessage: `Reading failed with error: ${e}`
        };
    }
}

async function writeData(storageData) {
    try {
        await sqlInjection(sqlQueries.insertIntoTable(storageData?.columnName, storageData?.id, storageData?.body));

        return JSON.stringify({
            status: 200,
            data: 'File manipulated successfully...',
            errorMessage: null
        });
    } catch (e) {
        return JSON.stringify({
            status: 204,
            data: null,
            errorMessage: `Writing failed with error: ${e}`
        });
    }
}

async function insertData(insertData) {
    try {
        let id = await getLastIndexOfList(insertData?.category);
        let storageData = { columnName: insertData?.category, id: id, body: insertData?.body }
        return writeData(storageData);
    } catch (e) {
        return (`Inserting failed with error: ${e}`);
    }
}

async function updateData(storageData) {
    try {
        await sqlInjection(sqlQueries.updateIntoTable(storageData?.category, storageData?.id));

        return JSON.stringify({
            status: 200,
            data: 'Item updated successfully...',
            errorMessage: null
        });
    } catch (e) {
        return JSON.stringify({
            status: 204,
            data: null,
            errorMessage: `Update failed with error: ${e}`
        });
    }
}

async function deleteData(storageData) {
    try {
        await sqlInjection(sqlQueries.deleteFromTable(storageData?.category, storageData?.id));

        return JSON.stringify({
            status: 200,
            data: 'Item deleted successfully...',
            errorMessage: null
        });
    } catch (e) {
        return JSON.stringify({
            status: 204,
            data: null,
            errorMessage: `delete failed with error: ${e}`
        });
    }
}

async function getLastIndexOfList(tableName) {
    try {
        let lastData = await fetchLastId(tableName);
        return lastData.length > 0 ? ++sortData(lastData)[0].id : 0;
    } catch (e) {
        throw new Error(`Id declaration failed with error: ${e}`);
    }
}

async function fetchLastId(tableName) {
    try {
        return await sqlInjection(sqlQueries.selectId(tableName));
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

module.exports = { insertUser, login, insertCategory, deleteCategory, readList, readData, insertData, updateData, deleteData }