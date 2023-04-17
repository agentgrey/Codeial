const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
        content:{
            type:String,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        // add the comment in the post schema also
        comments :[{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }]
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;