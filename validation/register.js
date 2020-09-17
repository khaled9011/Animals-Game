const isEmpty = require("./is-Empty");
const { default: validator } = require("validator");

function validateRegister(body) {
  const errors = {};
  let { email, password, name, password2 } = body;
  email = isEmpty(email) ? "" : email;
  password = isEmpty(password) ? "" : password;
  password2 = isEmpty(password2) ? "" : password2;
  name = isEmpty(name) ? "" : name;

  if (validator.isEmpty(email) || !validator.isEmail(email)) {
    errors.email = "Invalid Email";
  }

  if (
    validator.isEmpty(name) ||
    !validator.isLength(name, { min: 6, max: 30 })
  ) {
    errors.name = "Invalid Name";
  }

  if (
    validator.isEmpty(password) ||
    !validator.isLength(password, { min: 8, max: 30 })
  ) {
    errors.password = "Invalid Password";
  }

  if (validator.isEmpty(password2)) {
    errors.password2 = "Please Repeat your Password";
  }

  if (!validator.equals(password, password2)) {
    errors.match = "Passwords arn't matching";
  }
  let valid = true;
  if (!isEmpty(errors)) valid = false;
  return {
    errors,
    valid,
  };
}

module.exports = validateRegister;
