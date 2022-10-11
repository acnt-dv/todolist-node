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
    console.log('Reading file ...');
    return fs.readFileSync(__dirname + '/../data/list').toString();
}

async function writeData(newData) {
    let storageData = readData();
    storageData = Object.assign(newData);

    fs.writeFileSync(__dirname + '/../data/list', storageData.toString(), {flag: "a+"});
    return 'File updated successfully.';
}

module.exports = {readData, writeData}


