const validator = require("validator").default;
const isEmpty = require("./is-Empty");

module.exports = function ValidateLogin(body) {
  let errors = {};
  let { email, password } = body;
  password = isEmpty(password) ? "" : password;
  email = isEmpty(email) ? "" : email;
  if (!validator.isEmail(email) || validator.isEmpty(email))
    errors.email = "Invalid Email";
  if (validator.isEmpty(password) || !validator.isLength(password, { min: 7 }))
    errors.password = "Invalid Password";
  let valid = true;
  if (!isEmpty(errors)) valid = false;
  console.log(valid);
  return {
    errors,
    valid,
  };
};
