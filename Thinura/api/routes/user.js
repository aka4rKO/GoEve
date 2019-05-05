const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const User = require('../models/user');
const mongoose = require('mongoose');

//get user by id
router.get('/:fbId', (req, res, next) => {
    const usedId = req.params.fbId;
    User.findOne({
            facebookId: usedId
        })
        .exec()
        .then((result)=>{
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

module.exports = router;