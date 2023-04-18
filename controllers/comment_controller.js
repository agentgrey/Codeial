const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    let post = await Post.findById(req.body.post);
    if(post){
        let comment = await  Comment.create({
            content : req.body.content,
            post : req.body.post,
            user : req.user._id
        })
        post.comments.push(comment);
        post.save();

        res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    let comment = await Comment.findById(req.params.id);
    if(comment && comment.user == req.user.id){
        let postId = comment.post;
        await Comment.deleteOne({_id : req.params.id});
        // await Post.findById(postId, {$pull : {comments : req.params.id}});
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
    }
    return res.redirect('back');
}