"use strict";

// Dependencies.
const colour = require("colour");
const dateformat = require("dateformat");
const express = require("express");
const fs = require("fs");
const nlc = require("./nlc");
const path = require("path");

// Read and parse the config file.
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config.json")));

// A function to print the logs in the console.
const print = (msg) => { console.log(dateformat(new Date(), "dd/mm/yyyy HH:MM:ss").cyan + " > ".red + msg.green); };

// The IBM Watson NLC client.
const classifier = nlc(
    config.watson.nlc.username,
    config.watson.nlc.password,
    config.watson.nlc.classifierId
);

// Create the Express application.
const app = express();

// Set the public directory as static.
app.use(express.static("public"));

// The text classification endpoint.
app.get("/classify", (req, res, next) => {

    // Try to classify the given text.
    classifier.classify(req.query.text).then(

        // Send the response to the client.
        (data) => { res.send(data); },

        // In case of error.
        (err) => { return next(err); }
    );
});

// Run the server.
app.listen(
    config.server.port,
    config.server.host,
    () => {
        print("server running at http://" + config.server.host + ":" + config.server.port);
    }
);
