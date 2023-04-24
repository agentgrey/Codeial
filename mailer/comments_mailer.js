const nodemailer = require('../config/nodemailer');


exports.newComment = (comment)=>{
    //console.log("You are inside of the mailer, new Comment fucntion !" + comments);
    let htmlString = nodemailer.renderTemplate({comment : comment} , '/comments/new_comments.ejs');
    console.log("send here: ", comment.user.email);
    nodemailer.transporter.sendMail({
        from : 'codeial2714@gmail.com',
        to : comment.user.email,
        subject : "New comment published",
        html : htmlString
    }, (err, info) =>{
        if(err){
            console.log("**********" + err );
            return ;

        }
        // console.log("Mail, sent" , info);
        return ;
    })
}