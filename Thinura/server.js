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
app.use(BodyParser.urlencoded({
    extended: true
}));

var database, collection_event, collection_user;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, {
        useNewUrlParser: true
    }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection_event = database.collection("event-categories");
        collection_user = database.collection('');
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.get("/categories", (request, response) => {
    collection_event.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/user", (request, response) => {
    collection_user.insert(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});