const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

const Category = require('../models/categories');

//creating categories
router.post('/', upload.single('imageURL'), (req, res, next) => {
    console.log(req.file)
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        imageURL: req.file.path,
        status: false
    });

    category
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "handling POST categories routes",
                createdCategory: result
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

//get categories
router.get('/', (req, res, next) => {
    Category.find()
        .select("_id category imageURL status")
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                categories: docs.map((doc) => {
                    return {
                        category: doc.category,
                        imageURL: process.env.NODE_IP + doc.imageURL,
                        status: doc.status
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });

});

module.exports = router;