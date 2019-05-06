const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    event_id: Number,
    url: String,
    title: String,
    date: String,
    time: String,
    price: String,
    tags: String,
    state_city: String
});

const Event = mongoose.model('Event', eventSchema, process.env.DB_COLLECTION_EVENT_DETAILS);

module.exports = Event;