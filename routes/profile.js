const express = require("express");
const router = express.Router();
const passport = require("passport");
const ValidateProfile = require("../validation/profileRegister");
//models
const profile = require("../models/Profile");
const user = require("../models/User");

router.get("/test", (req, res) => {
  res.json({
    msg: "hello from profile :D",
  });
});

//route to get current user's profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    profile
      .findOne({ user: req.user.id })
      .then((profile) => {
        if (profile) {
          res.json({
            msg: "we got the user's profile",
          });
        } else {
          errors.profile = "user profile not found / create new user profile";
          res.status(404).json({
            errors,
          });
        }
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);

//route to creating a new profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, valid } = ValidateProfile(req.body);
    if (valid) {
      const Profile = new profile({
        user: req.user.id,
        bio: req.body.bio,
        avatar: req.body.avatar,
        handle: req.body.handle,
        social: {
          facebook: req.body.facebook,
          twitter: req.body.facebook,
          instagram: req.body.facebook,
          favAnimal: req.body.favAnimal,
        },
      });
      //update profile. not yet complete.
      profile.findOne({ user: req.body.user }).then((found) => {
        if (found) {
          console.log("hello we are trying to update here");
          profile
            .findOneAndUpdate(
              { user: req.body.user },
              { $set: Profile },
              { new: true }
            )
            .then((updated) => {
              res.json(updated);
            });
        } else {
          profile.findOne({ handle: req.body.handle }).then((found) => {
            if (found) {
              errors.handle = "this handle already exists";
            } else {
            }
          });
          Profile.save()
            .then((success) => {
              res.json({
                success,
              });
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        }
      });
    } else {
      res.status(400).json(errors);
    }
  }
);

//return user profile through their handle
router.get("/handle/:handle", (req, res) => {
  console.log("hellooo");
  const errors = {};
  profile
    .findOne({ handle: req.params.handle })
    .then((found) => {
      if (!found) {
        errors.profile = "there is no user with this handle";
        res.json(errors);
      } else {
        //RETURN USER PROFILE.
        res.json(found);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

//return user profile through their ID
router.get("/user/:id", (req, res) => {
  const errors = {};
  profile
    .findOne({ user: req.params.id })
    .then((found) => {
      if (!found) {
        errors.profile = "there is no profile for a user with this ID";
        res.json(errors);
      } else {
        res.json(found);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

//returns all user profiles
router.get("/all", (req, res) => {
  profile
    .find()
    .then((profiles) => {
      if (!profiles) {
        res.json("there are no profiles");
      }
      res.json(profiles);
    })
    .catch((err) => {
      res.json("there are no profiles");
    });
});

//delete a profile along with the User
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    profile
      .findOneAndRemove({ user: req.user.id })
      .then(() => {
        user.findOneAndRemove({ _id: req.user.id }).then(() => {
          res.json({ msg: "Success!" });
        });
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

module.exports = router;
