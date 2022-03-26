const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Model");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================

//find favorite information inside Favorite collection by movie id
router.post("/favoriteNumber", auth, (req, res) => {
    Favorite.find({"movieId":req.body.movieId})
    .exec((err,favorite) =>{
        if(err){return res.status(400).send(err);}
        else{
            //console.log(favorite);
            res.status(200).json({success: true,favoriteNumber: favorite.length});
        }
    });
});

//find favorite information inside favorite collection by movie id, userFrom
router.post("/favorited",auth,(req,res) =>{
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err,favorite) =>{
        if(err){return res.status(400).send(err);}
        else{
            let result = false;
            if(favorite.length != 0){
                result = true;
            }
            //console.log(result);
            res.status(200).json({success: true,favorited: result});
        }
    })
});

//find no of favorite movies users account by userFrom
router.post("/favoriteCount",auth,(req,res) =>{
    Favorite.find({"userFrom": req.body.userFrom})
    .exec((err,favorite) =>{
        if(err){return res.status(400).send(err);}
        else{
            //console.log(result);
            res.status(200).json({success: true,favoriteCount: favorite.length});
        }
    })
});

router.post("/addToFavorite", auth, (req, res) => {
    //Save the info about move,user,id inside favorite collection
    const favorite = new Favorite(req.body);
    favorite.save((err,doc)=>{
        if(err){return res.json({success: false,err});}
        else{return res.status(200).json({success:true,doc});}
    })
});

router.post("/removeFromFavorite", auth, (req, res) => {
    //find and remove the info from favorite collection
    Favorite.findOneAndDelete({movieId: req.body.movieId,userFrom: req.body.userFrom})
    .exec((err,doc)=>{
        if(err){return res.status(400).json({success:false,err});}
        else{return res.status(200).json({success:true,doc});}
    });
});

//find all favorate movies from favorite collection by userid
router.post("/getFavoredMovie",auth,(req,res) =>{
    console.log(req.body.userFrom);
    Favorite.find({"userFrom": req.body.userFrom})
    .exec((err,favorite) =>{
        if(err){return res.status(400).send(err);}
        else{
            console.log(favorite);
            res.status(200).json({success: true,favoritedMovies: favorite});
        }
    })
});

module.exports = router;
