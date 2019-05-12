const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    event_id: {
        type: Number
    },
    url: {
        type: String
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    price: {
        type: String
    },
    tags: {
        type: String
    },
    state_city: {
        type: String
    }
});

const Event = mongoose.model('Event', eventSchema, process.env.DB_COLLECTION_EVENT_DETAILS);

module.exports = Event;