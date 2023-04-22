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
        req.flash('success', 'New Comment Added');
        post.comments.push(comment);

        post.save();

        if(req.xhr){
            comment = await comment.populate('user', 'name');
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
        }
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
        req.flash('success', 'Comment deleted');
    }
    return res.redirect('back');
}