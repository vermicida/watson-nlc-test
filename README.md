# watson-nlc-test

This is an example of IBM Watson Natural Language Classifier. This app can extract the intent of the questions you do to it. The training data for this example is just a few lines of financial-oriented (and in spanish) texts, so you must ask the app within this context.

These are the intents that we will train:
- préstamo
- tarjeta crédito
- cuenta
- seguro

## Getting started

The first step is to create an [IBM Bluemix](https://console.ng.bluemix.net/) account and a new service for [Natural Language Classifier](https://console.ng.bluemix.net/catalog/services/natural-language-classifier/); you can find it under the Catalog's Watson section. You will be using the Natural Language Classifier service's username and password in a minute, so have them on hand; get them from your IBM Bluemix app's environment variables.

Now, clone this repo using the command below:
```bash
$ git clone https://github.com/vermicida/watson-nlc-test.git
```

Then, install de app dependencies using NPM:
```bash
$ cd watson-nlc-test
$ npm install
```

Now we're ready to configure the app.

## Configuration

Open the `config.json` file, located in the app root, and fill in the Natural Language Classifier credentials: 
```json
{
  "watson": {
    "nlc": {
      "username": "Write down the username you already got right here",
      "password": "And do the same with the password here"
    }
  }
}
```

It's time to create and train your classifier. Go to the `classifier` directory and run this command:
```bash
$ node classifier-create.js fin-train.csv MyFinancialClassifier es
```

This script will use your credentials to create the classifier. If you mind, this traning data is a two columns `csv` document, in which the first coulmn is a natural language question and the second one is the corresponding intent. Feel free to add more question/intents or create a new `csv` document for your our tests.

The classifier creation outputs a **classifier_id**; don't forget to push it to the `config.json` file:
```json
{
  "watson": {
    "nlc": {
      "classifierId": "Insert your classifier identifier here, please"
    }
  }
}
```

Depending on the `csv` document size, the training may take a while. The given `csv` takes around 6 minutes to train. You can check the status of your classifier anytime using the script `classifier-status-js`:
```bash
$ node classifier-status.js
```

You can set the app server's host and port if you want. Do it this way:
```json
{
  "server": {
    "host": "localhost",
    "port": 9000
  }
}
```

If you change the app server's host or port in the `config.json` document, remember to change them too in the webapp. Go to the `public/index.html` document and locate an AngularJS value called `apiUri`; then, change the URI to the server:
```javascript
.value("apiUri", "http://localhost:9000/")
```

## Running

You're only one step to chat with your bot. Just run the NPM `dev` script in the root directory:
```bash
$ npm run dev
```

Navigate the server in a browser _et voilà_!

Try some questions like these below:
- Este mes estoy muy mal de pasta. ¿Me prestas dinero?
- Mi hermana tiene humedad en el techo de su baño. ¿Qué puede hacer?
- ¿Qué documentación necesito para mi nueva moto?
- Acabo de tener un hijo y quiero ingresarle dinero todos los meses. ¿Qué me recomiendas?
- Me ha surgido un imprevisto y no tengo dinero para pagar el alquiler. ¿Puedes ayudarme?

## License

Code released under the [MIT license](./LICENSE).
