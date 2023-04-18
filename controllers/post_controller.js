const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    let post = await Post.create({
        content : req.body.content,
        user : req.user.id
    });
    // console.log(post);
    return res.redirect('back');
}

module.exports.destroy = async function(req, res){
    //console.log(req.params + " parama");
    let post = await Post.findById(req.params.id);
    // console.log(req.params.id);
    // console.log(post + " post");
    if(post && post.user == req.user.id){
        let p = await Post.deleteOne({_id : req.params.id});
        await Comment.deleteMany({post : req.params.id});
        //await post.remove();
    }
    return res.redirect('back');
}