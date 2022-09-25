const { hash, compare } = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/User.model");
const { createToken } = require("../utils/config");
const { verifyToken } = require("../utils/protected");
const { response } = require("../utils/response");

const register = async (req, res) => {
 const { email, password } = req.body;
 if (!email || !password) {
  return response(
   res,
   StatusCodes.BAD_REQUEST,
   false,
   {},
   "Could not register. Please provide all necessary information"
  );
 }

 try {
  const oldUser = await User.findOne({
   email: email,
  });

  if (oldUser) {
   let msg = "There is already an user created using this email.";
   return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
  }

  const emailRegex =
   /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!emailRegex.test(email)) {
   let msg = "Invalid email address.";
   return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
  }

  if (password.length < 8) {
   let msg = "Password length must be minimum 8 characters.";
   return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
  }

  let pass;
  await hash(req.body.password, 9).then((hash) => {
   pass = hash;
  });

  const user = await User.create({
   email: email,
   password: pass,
   userType: "admin",
   activeStatus: true,
  });

  if (!user) {
   return response(
    res,
    StatusCodes.FORBIDDEN,
    false,
    {},
    "Could not create user."
   );
  }

  return response(res, StatusCodes.ACCEPTED, true, { user: user }, null);
 } catch (error) {
  return response(
   res,
   StatusCodes.INTERNAL_SERVER_ERROR,
   false,
   {},
   error.message
  );
 }
};

module.exports = { register };
