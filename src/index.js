const { readData, insertData, updateData, deleteData } = require("./utils/fileManipulator");

let express = require('express');
let formidable = require('formidable');

let app = express();
app.use(express.static('public'));

app.get('/getList', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    readData()
        .then(response => res.send(response));
});

app.post('/insertIntoList', function (req, res) {
    console.log('new item reached');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json = ({ fields, files });

        insertData(res.json.fields)
            .then(response => res.end(response));
    });
});

app.post('/updateList', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json = ({ fields, files });

        updateData(res.json.fields)
            .then(response => res.end(response));
    });

});

app.post('/deleteFromList', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json = ({ fields, files });
        deleteData(res.json.fields)
            .then(response => res.end(response));
    });

});

app.get('/home', function (req, res) {
    res.sendFile(__dirname + "/views/" + "index.html");
})

let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})







