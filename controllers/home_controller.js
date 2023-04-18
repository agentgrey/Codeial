const Post = require('../models/post');
const User = require('../models/user')

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

    let users = await User.find({});
    //console.log(users);
    //console.log(post);
    return res.render('home', {
        title: "Codial | Home",
        posts : post,
        allUser : users
    });
}

// module.exports.actionName = function(req, res){}