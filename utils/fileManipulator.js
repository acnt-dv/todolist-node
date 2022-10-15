let fs = require('fs');

/*
let readerStream = fs.createReadStream(__dirname + '/../data/list');
readerStream.setEncoding("utf-8");

readerStream.on('data', function (chunk) {
    console.log('File reading is in progress ...');
    data += chunk;
});
readerStream.on('end', function () {
    console.log('File readied successfully.');
});
readerStream.on('error', function (err) {
    console.log(err.stack);
});
*/

async function readData() {
    try {
        console.log('Reading file ...');
        return JSON.parse(fs.readFileSync(__dirname + '/../data/list').toString());
    } catch (e) {
        throw new Error(`Reading failed with error: ${e.stackTrace}`);
    }
}

function writeData(storageData) {
    try {
        console.log('Writing file ...');
        fs.writeFileSync(__dirname + '/../data/list', JSON.stringify(storageData), /*{flag: "a+"}*/);
        return 'File manipulated successfully.';
    } catch (e) {
        throw new Error(`Writing failed with error: ${e.stackTrace}`);
    }
}

async function checkForDuplicatedEntry(list, entry) {
    return list.filter(x => x.id === entry.id);
}

async function insertData(insertData) {
    try {
        let insertDataEntry = JSON.parse(insertData);
        let storageData = await readData();
        let checkValue = await checkForDuplicatedEntry(storageData, insertDataEntry);
        if (checkValue.length < 1) {
            storageData.push(insertDataEntry);
        } else {
            //TODO: override
        }
        return writeData(storageData);
    } catch (e) {
        return (`Insert failed with error: ${e.stackTrace}`);
    }
}

async function updateData(updateData) {
    try {
        let updateDataEntry = JSON.parse(updateData);
        let storageData = await readData();

        storageData = storageData.filter(x => x.id !== updateDataEntry.id);
        storageData.push(updateDataEntry);

        return writeData(storageData);
    } catch (e) {
        return (`Update failed with error: ${e.stackTrace}`);
    }
}

async function deleteData(deleteItem) {
    try {
        let deleteItemEntry = JSON.parse(deleteItem);
        let storageData = await readData();

        storageData = storageData.filter(x => x.id !== deleteItemEntry.id);

        return writeData(storageData);
    } catch (e) {
        return (`Delete failed with error: ${e.stackTrace}`);
    }
}

module.exports = {readData, insertData, updateData, deleteData}


