const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const keys = require('./config/keys')

const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));

var database, collection_user_details, collection_event_details, collection_event_categories, collection_event_rating;

app.listen(3000, () => {
    MongoClient.connect(keys.mongodb.dbURI, {
        useNewUrlParser: true
    }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(keys.mongodb.db_name);
        collection_event_details = database.collection(keys.mongodb.db_collection_event_details);
        collection_event_categories = database.collection(keys.mongodb.db_collection_event_categories);
        collection_event_rating = database.collection(keys.mongodb.db_collection_event_rating);
        collection_user_details = database.collection(keys.mongodb.db_collection_user_details);
        collection_user_tags = database.collection(keys.mongodb.db_collection_user_tags);
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.get("/categories", (request, response) => {
    collection_event_categories.find({}).toArray((error, result) => {
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