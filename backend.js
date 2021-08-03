const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(cors());
app.use(express.json());

app.get('/readFile', function (req, res) {
    fs.readFile("./data.json", "utf8", (err, result) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        try {
            const scores = result;
            console.log("---readfile---")
            console.log(scores);
            return res.json(scores);
        } catch (err) {
            console.log("Error", err);
        }
    })
});

app.post('/writeFile', function (req, res) {
    console.log("----writefile----")
    console.log(req.body);
    var data = JSON.stringify(req.body);
    fs.writeFile("./data.json", data, function (err) {
        if (err) {
            console.log("Error writing to file:", err);
        }
        return res.status(200).json({ message: "File Written"});
    })
});

app.use(function (err, req, res, next) {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Unknown Error!';
    return res.status(status).json({
        error: message,
    });
});

app.listen(8080, function () {
    console.log('Tic-Tac-Toe is running');
});