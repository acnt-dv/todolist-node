const {readData, writeData} = require("./utils/fileManipulator");
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/getList', function (req, res) {
    readData()
        .then(response => res.send(response));
});

app.post('/addToList', function (req, res) {
    writeData(JSON.stringify(req.body))
        .then(response => res.end(response));
})

app.get('/home', function (req, res) {
    res.sendFile(__dirname + "/views/" + "index.html");
})

let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})







