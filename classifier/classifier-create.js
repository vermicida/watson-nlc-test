
// Show a title.
console.log("---------------------------------------------------------------------------------------");
console.log("IBM WATSON NATURAL LANGUAGE CLASSIFIER");

// Get the cli arguments.
const args = process.argv;

// In case of bad request.
if (args.length !== 5) {

    // Show an error message and exit this process.
    console.log("---------------------------------------------------------------------------------------");
    console.log("You must use this way:");
    console.log("$ node classifier-create.js <training-csv-file> <classifier-name> <classifier-language>");
    console.log("---------------------------------------------------------------------------------------");
    process.exit(1);
}

// Otherwise.
else {

    // Dependencies.
    const fs = require("fs");
    const nlc = require("../server/nlc");
    const path = require("path");

    // Read and parse the config file.
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config.json")));

    // Create the IBM Watson NLC client.
    var classifier = nlc(
        config.watson.nlc.username,
        config.watson.nlc.password
    );

    // Create the classifier.
    classifier.create(args[2], args[3], args[4]).then(

        // Show the classifier identifier.
        (data) => {
            console.log("---------------------------------------------------------------------------------------");
            console.log("Classifier created:");
            console.log(JSON.stringify(data, null, 2));
            console.log("---------------------------------------------------------------------------------------");
            process.exit(0);
        },

        // In case of error.
        (err) => {
            console.log("---------------------------------------------------------------------------------------");
            console.log("IBM Watson NLC thrown an error:");
            console.log(JSON.stringify(err, null, 2));
            console.log("---------------------------------------------------------------------------------------");
            process.exit(1);
        }
    );
}
