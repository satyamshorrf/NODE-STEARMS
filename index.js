const express = require("express");
const fs = require("fs");
const status = require("express-status-monitor");

const app = express();
const PORT = 8000;

app.use(status());

app.get("/", (req, res) => {
    fs.readFile("./sample.txt", (err, data) => {
        res.end(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`)

});