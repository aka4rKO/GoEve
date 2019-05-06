const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    facebookId: Number,
    name: String,
    tags: String
});

const User = mongoose.model('User', userSchema, process.env.DB_COLLECTION_USER_DETAILS);

module.exports = User;