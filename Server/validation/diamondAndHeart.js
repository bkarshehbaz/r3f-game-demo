const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateDiamondAndHeartInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.diamonds = !isEmpty(data.diamonds) ? data.diamonds : "";
  data.hearts = !isEmpty(data.hearts) ? data.hearts : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // Diamonds checks
  if (Validator.isEmpty(data.diamonds)) {
    errors.diamonds = "Diamonds field is required";
  }

  // Hearts checks
  if (Validator.isEmpty(data.hearts)) {
    errors.hearts = "Hearts field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
