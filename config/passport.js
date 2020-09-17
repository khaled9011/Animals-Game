const passport = require("passport");
const { secret } = require("./keys");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new jwtStrategy(
      {
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret,
      },
      (payload, done) => {
        User.findById(payload.id)
          .then((user) => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    )
  );
};
