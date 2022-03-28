const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const likeSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    commentId: {
        type:String
    },
    timestamp:{
        type:String
    }
});

const disLikeSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    commentId: {
        type:String
    },
    timestamp:{
        type:String
    }
});

const Like = mongoose.model('Like', likeSchema);
const DisLike = mongoose.model('DisLike', disLikeSchema);

module.exports = { Like,DisLike };