const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {
        type: String
    },
    imageURL: {
        type: String
    }
});

const Category = mongoose.model('Category', categoriesSchema, process.env.DB_COLLECTION_EVENT_CATEGORIES);

module.exports = Category;