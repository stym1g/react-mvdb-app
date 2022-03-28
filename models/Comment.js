const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    commentId:{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    commentBody:{
        type: String
    },
    commentTime: {
        type:String
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };