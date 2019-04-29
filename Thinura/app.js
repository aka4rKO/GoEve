const express = require('express');

const app = express();
// app.use((resq, res, next) => {
//     res.status(200).json({
//         message: 'Changed branch'
//     });
// })


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thinura:Thinura_1999@thinura-vxvn1.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});
const collection;
client.connect(err => {
    collection = client.db("Goeve").collection("event-categories");
    // perform actions on the collection object
    client.close();
});

app.get("/", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

module.exports = app;