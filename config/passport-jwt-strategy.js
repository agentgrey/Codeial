const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

// let opts = {
//     jwtFromRequtest : ExtractJWT.fromAuthHeaderAsBearerToken,
//     secretOrKey : 'codial'
// }

let opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'codeial';

passport.use(new JWTStrategy(opts, async function(jwtPayLoad, done){
    let user = await User.findById(jwtPayLoad._id);
    if(user){
        return done(null, user);
    }else{
        return done(null, false);
    }

}))



module.export = passport;