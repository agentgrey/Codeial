const Post = require('../models/post');

module.exports.create = async function(req, res){
    let post = await Post.create({
        content : req.body.content,
        user : req.user.id
    });
    // console.log(post);
    return res.redirect('back');
}