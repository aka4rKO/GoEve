const express = require('express');
const router = express.Router();

//creating categories
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "handling POST categories routes"
    });
});

//get categories
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET categories routes'
    });
});

module.exports = router;