// const http = require('http')
// const app = require('./app')

// const port = process.env.PORT || 3000;
// const server = http.createServer(app);

// server.listen(port);

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://thinura:Thinura_1999@thinura-vxvn1.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "Goeve";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("event-categories");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});