
// Dependencies.
const fs = require("fs");
const Q = require("q");
const watson = require("watson-developer-cloud");

// The NLC client.
const client = function(username, password, classifierId) {

    // The classifier identifier.
    const classifier = classifierId;

    // Create the NLC client.
    const nlc = watson.natural_language_classifier({
        username: username,
        password: password,
        version: "v1"
    });

    // Create a new classifier.
    this.create = (file, name, language) => {

        const deferred = Q.defer();

        const params = {
            name: name,
            language: language,
            training_data: fs.createReadStream(file)
        };

        nlc.create(params, (err, data) => { if (err) { deferred.reject(err); } else { deferred.resolve(data); } });

        return deferred.promise;
    };

    // Check the status of the current classifier.
    this.status = () => {

        const deferred = Q.defer();

        const params = {
            classifier_id: classifier
        };

        nlc.status(params, (err, data) => { if (err) { deferred.reject(err); } else { deferred.resolve(data); } });

        return deferred.promise;
    };

    // Try to classify the given text using the current classifier.
    this.classify = (text) => {

        const deferred = Q.defer();

        const params = {
            text: text,
            classifier_id: classifier
        };

        nlc.classify(params, (err, data) => { if (err) { deferred.reject(err); } else { deferred.resolve(data); } });

        return deferred.promise;
    };
};

// Export the NLC client constructor.
module.exports = (username, password, classifierId) => { return new client(username, password, classifierId); };
