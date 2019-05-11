const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const User = require('../models/user');
const Event = require('../models/event');
const mongoose = require('mongoose');
const {
    URLSearchParams
} = require('url');

//Adding ratings 
router.post('/ratings', (req, res, next) => {
    const params = new URLSearchParams();
    const event_id = req.body.event_id;
    const user_id = req.body.user_id;
    const rating = req.body.rating;
    console.log(event_id, user_id, rating);
    const url = `http://35.197.184.241:5000/rating/add`;
    const getData = async url => {
        try {
            params.append('eventId', event_id);
            params.append('userId', user_id);
            params.append('rating', rating);
            console.log("Params ",params)
            const response = await fetch(url, {
                method: 'POST',
                body: params
            });
            const json = await response.json();
            res.status(200).json(json);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        };
    };
    getData(url);
});

//get users' events according to tags
router.get('/newUser/:fbId', (req, res, next) => {
    const params = new URLSearchParams();
    const usedId = req.params.fbId;
    console.log(usedId);
    const url = `http://35.197.184.241:5000/newuser`;
    User.findOne({
            facebookId: usedId
        })
        .exec()
        .then((result) => {
            let arrayRes = [];
            console.log(result);

            const getData = async url => {
                try {
                    params.append('categories', result.tags);
                    const response = await fetch(url, {
                        method: 'POST',
                        body: params
                    });
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
            };
            getData(url);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

//getting access token
router.post('/', (req, res, next) => {
    const fbId = req.body.fbId;
    const accessToken = req.body.accessToken;
    const url = `https://graph.facebook.com/${fbId}?fields=email,name,friends&access_token=${accessToken}`;
    const getData = async url => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                facebookId: json.id,
                name: json.name,
                tags: null
            });

            user
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Handling POST requests to /user",
                        details: result
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({
                        error: error
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        };
    }
    getData(url);
});

//getting user tags
router.patch('/:fbId', (req, res, next) => {

    const usedId = req.params.fbId;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    User.update({
            facebookId: usedId
        }, {
            $set: updateOps
        })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

//delete an user
router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;

    res.status(200).json({
        message: 'handling DELETE event routes',
        userId: userId
    });
});

//get user by id
router.get('/:fbId', (req, res, next) => {
    const usedId = req.params.fbId;
    User.findOne({
            facebookId: usedId
        })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "handling POST user routes",
                createdEvent: result
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});
module.exports = router;
