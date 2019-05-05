const express = require('express');
const router = express.Router();

//getting access token
router.post('/', (req, res, next) => {
    const accessToken = req.body.accessToken;

    // you need permission for most of these fields
    const userFieldSet = 'id, name, about, email, accounts, link, is_verified, significant_other, relationship_status, website, picture, photos, feed';

    const options = {
        method: 'GET',
        uri: `https://graph.facebook.com/v2.5/me?`,
        qs: {
            fields: userFieldSet,
            access_token: accessToken
        }
    };

    request(options)
        .then(fbRes => {
            res.status(200).json({
                fbRes: fbRes
            });
        })
        .catch(() => {
            res.status(400).json({
                message: 'ERROR GETTING DATA FROM FACEBOOK'
            })
        })

    // res.status(201).json({
    //     message: "Handling POST requests to /user",
    //     accessToken: accessToken
    // });
});

//getting user tags
router.get('/tags', (req, res, next) => {
    const usedId = req.body.userId;
    const tags = req.body.tags;

    const userTags = {
        userId: usedId,
        tags: tags
    };

    res.status(200).json({
        message: "Handling GET requests to /user",
        userTags: userTags
    });
});

//update tags
router.patch('/', (req, res, next) => {
    const userId = req.body.userId;
    const tags = req.body.tags;

    const updateUserTags = {
        userId: userId,
        tags: tags
    };

    res.status(200).json({
        message: "Handling GET requests to /user",
        updateUserTags: updateUserTags
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