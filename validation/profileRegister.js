const isEmpty = require("./is-Empty");
const { default: validator } = require("validator");

module.exports = function ValidateProfile(body) {
  const errors = {};
  let { handle, bio, avatar, favAnimal, facebook, twitter, instagram } = body;
  handle = isEmpty(handle) ? "" : handle;
  bio = isEmpty(bio) ? "" : bio;
  avatar = isEmpty(avatar) ? "" : avatar;
  favAnimal = isEmpty(favAnimal) ? "" : favAnimal;
  facebook = isEmpty(facebook) ? "" : facebook;
  twitter = isEmpty(twitter) ? "" : twitter;
  instagram = isEmpty(instagram) ? "" : instagram;

  if (
    (!validator.isURL(avatar) || !validator.isLength(avatar, { max: 300 })) &&
    !validator.isEmpty(avatar)
  ) {
    errors.avatar = "invalid avatar";
  }
  if (
    validator.isEmpty(handle) ||
    !validator.isLength(handle, { max: 40, min: 2 })
  ) {
    errors.handle = "invalid handle";
  }
  if (!validator.isEmpty(facebook)) {
    facebook = validator.isURL(facebook) ? facebook : "";
  }
  if (!validator.isEmpty(twitter)) {
    twitter = validator.isURL(twitter) ? twitter : "";
  }
  if (!validator.isEmpty(instagram)) {
    instagram = validator.isURL(instagram) ? instagram : "";
  }

  //valid
  let valid = true;
  if (!isEmpty(errors)) valid = false;
  return {
    errors,
    valid,
  };
};
