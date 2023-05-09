const { readData, insertData, updateData, deleteData } = require("./utils/fileManipulator");

let express = require('express');
let formidable = require('formidable');

let app = express();
app.use(express.static('public'));

app.get('/getList', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    try {
        readData()
        .then(response => res.send(response));    
    } catch (error) {
        return res.send(error);
    }
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

        try {
            insertData(res.json.fields)
            .then(response => res.end(response));   
        } catch (error) {
            return res.send(error);
        }
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

        try {
            updateData(res.json.fields)
            .then(response => res.end(response));
        } catch (error) {
            return res.send(error);
        }
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

        try {
            deleteData(res.json.fields)
            .then(response => res.end(response));
        } catch (error) {
            return res.send(error);
        }
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







