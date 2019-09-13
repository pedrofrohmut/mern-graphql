const validator = require("validator");

module.exports.validateRegisterInput = (userName, email, password, confirmPassword) => {
  const errors = {};
  if (validator.isEmpty(userName)) {
    errors.userName = "UserName must not be empty";
  }
  if (validator.isEmpty(email)) {
    errors.email = "Email must not be empty";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is not valid";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password must not be empty";
  } else if (!validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "Password and Confirm password must match";
  }
  console.log("#### ERRORS:", errors);
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports.validateLoginInput = (userName, password) => {
  const errors = {};
  if (validator.isEmpty(userName)) {
    errors.userName = "UserName must not be empty";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
