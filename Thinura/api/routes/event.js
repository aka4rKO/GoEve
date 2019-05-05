const express = require('express');
const router = express.Router();

//creating event details
router.post('/', (req, res, next) => {
    const event_id = req.body.event_id;
    const url = req.body.url;
    const title = req.body.title;
    const date = req.body.date;
    const time = req.body.time;
    const price = req.body.price;
    const tags = req.body.tags;
    const state_city = req.body.state_city;

    const event = {
        event_id: event_id,
        url: url,
        title: title,
        date: date,
        time: time,
        price: price,
        tags: tags,
        state_city: state_city
    };

    res.status(201).json({
        message: 'handling POST event routes',
        event: event
    });
});

//getting all event details
router.get('/', (req, res, next) => {
    Category.find()
        .select("_id event_id url title date time price tags state_city")
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                events: docs.map((doc) => {
                    return {
                        event_id: doc.event_id,
                        url: doc.url,
                        title: doc.title,
                        date: doc.date,
                        time: doc.time,
                        price: doc.price,
                        tags: doc.tags,
                        state_city: doc.state_city
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