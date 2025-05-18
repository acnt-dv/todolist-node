const express = require('express');
const formidable = require('formidable');

const { loadDb } = require("./src/database/connection");
const { insertCategory, deleteCategory, readData, readList, insertData, updateData, deleteData, insertUser } = require("./src/database/utils/sqlManipulator");

let app = express();
app.use(express.static('public'));

app.post('/buildCategory', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            // next(err);
            console.error(err);
            return;
        }
        res.json = ({ fields, files });

        try {
            console.log(`inserting category ${JSON.stringify(fields)}`);
            insertCategory(res.json.fields)
                .then(response => res.send(response));
        } catch (error) {
            return res.send(error);
        }
    });
});

app.post('/signUp', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json = ({ fields, files });

        try {
            console.log(`inserting category ${JSON.stringify(fields)}`);
            insertUser(res.json.fields)
                .then(response => res.send(response));
        } catch (error) {
            return res.send(error);
        }
    });
})

app.post('/deleteCategory', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            // next(err);
            console.error(err);
            return;
        }
        res.json = ({ fields, files });

        try {
            console.log(`deleting category ${JSON.stringify(fields)}`);
            deleteCategory(res.json.fields)
                .then(response => res.send(response));
        } catch (error) {
            return res.send(error);
        }
    });
});

app.get('/getListNames', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    try {
        console.log(`getting list of users...`);
        readList()
            .then(response => res.send(response));
    } catch (error) {
        return res.send(error);
    }
});

app.get('/getList', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    try {
        console.log(`getting list of ${JSON.stringify(req?.query)}`);
        readData(req.query)
            .then(response => res.send(response));
    } catch (error) {
        return res.send(error);
    }
});

app.post('/insertIntoList', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            // next(err);
            console.error(err);
            return;
        }
        res.json = ({ fields, files });

        try {
            console.log(`inserting item into list ${JSON.stringify(fields)}`);
            insertData(res.json.fields)
                .then(response => res.send(response));
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
            // next(err);
            console.error(err);
            return;
        }
        res.json = ({ fields, files });

        try {
            console.log(`updating list ${JSON.stringify(fields)}`);
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
            // next(err);
            console.error(err);
            return;
        }
        res.json = ({ fields, files });

        try {
            console.log(`deleting from list ${JSON.stringify(fields)}`);
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

let server = app.listen(8081, async function () {
    try {
        loadDb().then(() => console.log('DB connected.'));
    } catch (e) {
        console.error(e);
    }

    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})
