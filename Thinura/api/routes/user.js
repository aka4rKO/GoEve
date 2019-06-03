const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const User = require('../models/user');
const Event = require('../models/event');
const mongoose = require('mongoose');
const {
    URLSearchParams
} = require('url');

//Creaating a user with access token
router.post('/', (req, res, next) => {
    const accessToken = req.body.accessToken;

    const url = `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,name,picture.type(small)`;
    const getData = async url => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log("Results fb id", json.id);

            User.findOne({
                    facebookId: json.id
                })
                .exec()
                .then((findResult) => {
                    if (findResult == null) {

                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            facebookId: json.id,
                            name: json.name,
                            email: json.email,
                            profileImgURL: json.picture.data.url,
                            tags: null
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created",
                                    user: result
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({
                                    message: "Error occurred while saveing the user details.",
                                    error: error
                                });
                            });

                    } else {
                        res.status(202).json({
                            message: "User already in use",
                            user: findResult
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({
                        message: "Error occurred while finding the user details.",
                        error: error
                    });
                });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error occurred while fetching the user details from graph API.",
                error: error
            });
        };
    }
    getData(url);
});

//Updating user tags
router.patch('/:fbId', (req, res, next) => {

    const userdId = req.params.fbId;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    User.findOne({
            facebookId: userdId
        })
        .exec()
        .then((result) => {
            console.log(result);
            if (result != null) {
                User.updateOne({
                        facebookId: userdId
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
            } else {

                res.status(404).json({
                    count: 0,
                    message: "There is no user for this user id " + userdId + ".",
                    user: result
                });
            }
        });
});

//Adding ratings 
router.post('/ratings', (req, res, next) => {
    const params = new URLSearchParams();
    const event_id = req.body.event_id;
    const user_id = req.body.user_id;
    const rating = req.body.rating;
    console.log(event_id, user_id, rating);
    const url = `http://35.244.118.239:5000/rating/add`;
    const getData = async url => {
        try {
            params.append('eventId', event_id);
            params.append('userId', user_id);
            params.append('rating', rating);
            console.log("Params ", params)
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
    const url = `http://35.244.118.239:5000/newuser`;
    User.findOne({
            facebookId: usedId
        })
        .exec()
        .then((result) => {
            let arrayRes = [];
            console.log(result.tags);

            const getData = async url => {
                try {
                    params.append('categories', result.tags);
                    const response = await fetch(url, {
                        method: 'POST',
                        body: params
                    });
                    const json = await response.json();
                    json.eventIds.map((doc) => {
                        console.log(doc)
                        Event.findOne({
                                event_id: doc
                            })
                            .select("_id event_id url title date time price tags state_city")
                            .exec()
                            .then((result) => {                                
                                arrayRes.push(result);
                                if (arrayRes.length == json.eventIds.length)
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

//delete an user
router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;

    res.status(200).json({
        message: 'handling DELETE event route',
        userId: userId
    });
});

//get user by id
router.get('/:fbId', (req, res, next) => {
    const userdId = req.params.fbId;
    User.findOne({
            facebookId: userdId
        })
        .exec()
        .then((result) => {
            console.log(result);
            if (result == null) {
                res.status(404).json({
                    count: 0,
                    message: "There is no user for this user id " + userdId + ".",
                    user: result
                });
            }
            res.status(201).json({
                count: 1,
                message: "Details for " + userdId,
                user: result
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