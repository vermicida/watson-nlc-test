
// Dependencies.
const fs = require("fs");
const Q = require("q");
const watson = require("watson-developer-cloud");

// The NLC client.
const client = function(username, password, classifierId) {

    const classifier = classifierId;

    const nlc = watson.natural_language_classifier({
        username: username,
        password: password,
        version: "v1"
    });

    this.create = (file, name, language) => {

        var deferred = Q.defer();

        var params = {
            name: name,
            language: language,
            training_data: fs.createReadStream(file)
        };

        nlc.create(params, (err, data) => {

            if (err) { deferred.reject(err); } else { deferred.resolve(data); }
        });

        return deferred.promise;
    };

    this.status = () => {

        var deferred = Q.defer();

        var params = {
            classifier_id: classifier
        };

        nlc.status(params, (err, data) => {

            if (err) { deferred.reject(err); } else { deferred.resolve(data); }
        });

        return deferred.promise;
    };

    this.classify = (text) => {

        var deferred = Q.defer();

        var params = {
            text: text,
            classifier_id: classifier
        };

        nlc.classify(params, (err, data) => {

            if (err) { deferred.reject(err); } else { deferred.resolve(data); }
        });

        return deferred.promise;
    };
};

// Export the NLC client constructor.
module.exports = (username, password, classifierId) => { return new client(username, password, classifierId); };
