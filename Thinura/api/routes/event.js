const express = require('express');
const router = express.Router();

//creating event details
router.post('/', (req, res, next) => {
    const eventId = req.body.eventId;
    const eventURL = req.body.eventURL;
    const eventTitle = req.body.eventTitle;
    const eventDate = req.body.eventDate;
    const eventTime = req.body.eventTime;
    const eventPrice = req.body.eventPrice;
    const eventTags = req.body.eventTags;
    const eventLocation = req.body.eventLocation;

    const event = {
        eventId: eventId,
        eventURL: eventURL,
        eventTitle: eventTitle,
        eventDate: eventDate,
        eventTime: eventTime,
        eventPrice: eventPrice,
        eventTags: eventTags,
        eventLocation: eventLocation
    };

    res.status(201).json({
        message: 'handling POST event routes',
        event: event
    });
});

//getting all event details
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET event routes'
    });
});

//getting an event details
router.get('/:eventId', (req, res, next) => {
    const eventId = req.params.orderId;

    res.status(200).json({
        message: 'handling GET event routes',
        eventId: eventId
    });
});

//delete an event
router.delete('/:eventId', (req, res, next) => {
    const eventId = req.params.orderId;

    res.status(200).json({
        message: 'handling DELETE event routes'
    });
});

//update event
router.patch('/:eventId', (req, res, next) => {
    const eventId = req.params.orderId;

    res.status(200).json({
        message: "Handling GET requests to /user"
    });
});

module.exports = router;