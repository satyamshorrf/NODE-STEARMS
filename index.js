const express = require("express");
const fs = require("fs");
const zlib = require("zlib");
const status = require("express-status-monitor");

const app = express();
const PORT = 8000;

// Middleware for monitoring
app.use(status());

// Gzip the sample.txt file to sample.zip when the server starts
const gzipFile = () => {
    const input = fs.createReadStream("./sample.txt");
    const output = fs.createWriteStream("./sample.zip");
    const gzip = zlib.createGzip();

    input.pipe(gzip).pipe(output).on('finish', () => {
        console.log("File compressed to sample.zip");
    }).on('error', (err) => {
        console.error("Error during file compression:", err);
    });
};

// Start the gzip process
gzipFile();

// Serve the sample.txt file
app.get("/", (req, res) => {
    const stream = fs.createReadStream("./sample.txt", "utf-8");
    stream.on("data", (chunk) => res.write(chunk));
    stream.on("end", () => res.end());
    stream.on("error", (err) => {
        console.error("Error reading file:", err);
        res.status(500).send("Error reading file");
    });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});
