const { hash, compare } = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/User.model");
const { response } = require("../utils/response");

const createUser = async (req, res) => {
 const { name, email, password, phone, userType } = req.body;
 if (!name || !email || !password || !userType) {
  let msg = "Please provide all information.";
  return response(res, StatusCodes.BAD_REQUEST, false, {}, msg);
 }

 try {
  const oldUser = await User.findOne({
   email: email,
  });
  if (oldUser) {
   let msg = "User already exists.";
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
   name: name,
   phone: phone,
   password: pass,
   userType: userType,
   activeStatus: true,
  });

  if (!user) {
   let msg = "Could not create user.";
   return response(res, StatusCodes.FORBIDDEN, false, {}, msg);
  }

  return response(res, StatusCodes.CREATED, true, { user: user }, null);
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

module.exports = { createUser };
