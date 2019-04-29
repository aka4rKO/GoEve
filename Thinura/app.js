const express = require('express');

const app = express();
app.use((resq, res, next) => {
    res.status(200).json({
        message: 'Changed branch'
    });
})


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://thinura:Thinura_1999@thinura-vxvn1.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});
client.connect(err => {
    const collection = client.db("Goeve").collection("event-categories");
    console.log("Collection " + collection)
    // perform actions on the collection object
    client.close();
});


module.exports = app;