const Post = require('../models/post');

module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    
    let post = await Post.find({}).populate('user').populate({
            path:'comments',
            populate:{
                path:'user'
            }
        }
    );

    

    console.log(post);
    return res.render('home', {
        title: "Codial | Home",
        posts : post
    });
}

// module.exports.actionName = function(req, res){}