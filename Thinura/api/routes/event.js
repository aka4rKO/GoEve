const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Event = require('../models/event');

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
    Event.find()
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

//getting top recommendations for a user
router.get('/top/:fbId', (req, res, next) => {
    const fbId = req.params.fbId;
    const url = `http://35.189.6.233:5000/rbm/user/${fbId}`;
    let arrayRes = [];
    const getData = async url => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            json.eventIds.map((doc) => {
                Event.findOne({
                        event_id: doc
                    })
                    .select("_id event_id url title date time price tags state_city")
                    .exec()
                    .then((result) => {
                        arrayRes.push(result);
                        if (arrayRes.length == 10)
                            res.status(200).json(arrayRes);
                    })
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        };
    }
    getData(url);
});

//getting events based on users past ratings
router.get('/ratings/:fbId', (req, res, next) => {
    const fbId = req.params.fbId;
    const url = `http://35.189.6.233:5000/contentrecs/user/${fbId}`;
    let arrayRes = [];
    const getData = async url => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            json.eventIds.map((doc) => {
                Event.findOne({
                        event_id: doc
                    })
                    .select("_id event_id url title date time price tags state_city")
                    .exec()
                    .then((result) => {
                        arrayRes.push(result);
                        if (arrayRes.length == 10)
                            res.status(200).json(arrayRes);
                    })
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        };
    }
    getData(url);
});

//getting events based on users past ratings
router.get('/interests/:fbId', (req, res, next) => {
    const fbId = req.params.fbId;
    const url = `http://35.189.6.233:5000/svd/user/${fbId}`;
    let arrayRes = [];
    const getData = async url => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            json.eventIds.map((doc) => {
                Event.findOne({
                        event_id: doc
                    })
                    .select("_id event_id url title date time price tags state_city")
                    .exec()
                    .then((result) => {
                        arrayRes.push(result);
                        if (arrayRes.length == 10)
                            res.status(200).json(arrayRes);
                    })
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        };
    }
    getData(url);
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