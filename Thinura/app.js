const express = require('express');

const app = express();
app.use((resq, res, next) => {
    res.status(200).json({
        message:'Changed branch'
    });
})

module.exports = app;