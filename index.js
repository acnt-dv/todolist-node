const {readData, insertData, updateData, deleteData} = require("./utils/fileManipulator");
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/getList', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    readData()
        .then(response => res.send(response));
});

app.post('/insertIntoList', function (req, res) {
    insertData(JSON.stringify(req.body))
        .then(response => res.end(response));
});

app.post('/updateList', function (req, res) {
    updateData(JSON.stringify(req.body))
        .then(response => res.end(response));
});

app.post('/deleteFromList', function (req, res) {
    deleteData(JSON.stringify(req.body))
        .then(response => res.end(response));
});

app.get('/home', function (req, res) {
    res.sendFile(__dirname + "/views/" + "index.html");
})

let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})







