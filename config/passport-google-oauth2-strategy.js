const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
        clientID : "651120776925-jalgkplaar7p3a1chn79b4jlod21reke.apps.googleusercontent.com",
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/users/auth/google/callback'
    },

    async function(userToken, refreshToken, profile, done){
        let user = await User.findOne({email : profile.emails[0].value});
        try{
            if(user){
                done(null, user);
            }else{
                let u = await User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                })
                done(null, u);
            }

        }catch(err){
            console.log("Error in the passport-outh2-strategr "+ err);
            return ;
        }
    }
))

module.exports = passport;