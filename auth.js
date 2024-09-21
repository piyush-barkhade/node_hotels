const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./models/Person.js");

passport.use(
  new localStrategy(async (USERNAME, password, done) => {
    try {
      //console.log("received credentials", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
