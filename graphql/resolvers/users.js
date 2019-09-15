const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { validateRegisterInput, validateLoginInput } = require("../../utils/validators");
const User = require("../../models/User");

const generateToken = user =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      userName: user.userName
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

module.exports = {
  Mutation: {
    login: async (parent, args, context, info) => {
      const { userName, password } = args;
      const { errors, isValid } = validateLoginInput(userName, password);
      if (!isValid) {
        throw new UserInputError("Error", { errors });
      }
      const user = await User.findOne({ userName });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong crendentials", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    register: async (parent, args, context, info) => {
      try {
        const { userName, email, password, confirmPassword } = args.registerInput;
        // Validate user data
        const { errors, isValid } = validateRegisterInput(
          userName,
          email,
          password,
          confirmPassword
        );
        if (!isValid) {
          throw new UserInputError("Errors", { errors });
        }
        // Make sure user doesnt already exists
        const user = await User.findOne({ userName });
        if (user) {
          throw new UserInputError("UserName taken", {
            errors: { userName: "This userName is already taken" }
          });
        }
        // Hash the password and create an auth token
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
          email,
          userName,
          password: hashPassword,
          createdAt: new Date().toISOString()
        });
        const response = await newUser.save();
        const token = generateToken(response);
        return {
          ...response._doc,
          id: response._id,
          token
        };
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
