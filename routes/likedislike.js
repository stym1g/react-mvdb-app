const express = require('express');
const router = express.Router();
const { Like } = require("../models/LikeDisLike");
const { DisLike } = require("../models/LikeDisLike");
const { auth } = require("../middleware/auth");
const { default: mongoose } = require('mongoose');
//=================================
//             Likes DisLikes
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId}
    } else {
        variable = { commentId: req.body.commentId}
    }

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
})

router.post("/getDislikes", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    DisLike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })

})


router.post("/upLike", (req, res) => {
    let filter = {};
    let variable = {};
    if (req.body.movieId) {
        filter = {movieId: req.body.movieId, userFrom: req.body.userId};
        variable = { movieId: req.body.movieId, userFrom: req.body.userId,timestamp:req.body.timestamp }
    } else {
        filter = {commentId: req.body.commentId , userFrom : req.body.userId}
        variable = { commentId: req.body.commentId , userFrom : req.body.userId,timestamp:req.body.timestamp }
    }
    //console.log(variable);
    const like = new Like(variable);
    //save the like information data in MongoDB
    like.save((err, data) => {
        if (err) return res.json({ success: false, err });
        //In case disLike Button is already clicked, we need to decrease the dislike by 1 
        DisLike.findOneAndDelete(filter)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true,data:data });
            })
    })

});

router.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userFrom: req.body.userId}
    } else {
        variable = { commentId: req.body.commentId , userFrom : req.body.userId}
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})


router.post("/unDisLike", (req, res) => {

    let variable = {}
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userFrom: req.body.userId}
    } else {
        variable = { commentId: req.body.commentId , userFrom : req.body.userId}
    }

    DisLike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })


})



router.post("/upDisLike", (req, res) => {

    let filter = {};
    let variable = {};
    if (req.body.movieId) {
        filter = {movieId: req.body.movieId, userFrom: req.body.userId};
        variable = { movieId: req.body.movieId, userFrom: req.body.userId,timestamp:req.body.timestamp }
    } else {
        filter = {commentId: req.body.commentId , userFrom : req.body.userId}
        variable = { commentId: req.body.commentId , userFrom : req.body.userId,timestamp:req.body.timestamp }
    }
    //console.log(variable);
    const disLike = new DisLike(variable);
    //save the like information data in MongoDB
    disLike.save((err, data) => {
        if (err) return res.json({ success: false, err });
        //In case Like Button is already clicked, we need to decrease the like by 1 
        Like.findOneAndDelete(filter)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true,data:data })
            })
    })


})













module.exports = router;
