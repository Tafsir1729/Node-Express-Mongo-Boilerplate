const { compare } = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models/User.model");
const { createToken } = require("../../utils/config");
const { verifyToken } = require("../../utils/protected");
const { response } = require("../../utils/response");
const { securePassword } = require("../../utils/securePassword");

const register = async (req, res) => {
 const { email, password } = req.body;
 if (!email || !password) {
  let msg = "Could not register. Please provide all necessary information";
  return response(res, StatusCodes.BAD_REQUEST, false, {}, msg);
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

  const hashedPassword = await securePassword(req.body.password);

  const user = await User.create({
   email: email,
   password: hashedPassword,
   userType: "admin",
   activeStatus: true,
  });
  if (!user) {
   let msg = "Could not register.";
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

const login = async (req, res) => {
 const { email, password } = req.body;
 if (!email || !password) {
  let msg = "Please provide email and password.";
  return response(res, StatusCodes.BAD_REQUEST, false, {}, msg);
 }

 try {
  const user = await User.findOne({
   email: email,
  });
  if (!user) {
   let msg = "No account found.";
   return response(res, StatusCodes.NOT_FOUND, false, {}, msg);
  }

  const passwordMatched = await compare(password, user.password);
  if (passwordMatched) {
   if (user.activeStatus) {
    const token = await createToken(user);
    if (token) {
     return response(res, StatusCodes.OK, true, { token: token }, null);
    }
    let msg = "Could not login";
    return response(res, StatusCodes.BAD_REQUEST, false, {}, msg);
   } else {
    let msg = "Account is not active";
    return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
   }
  } else {
   let msg = "Incorrect Password!";
   return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
  }
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

const reLogin = async (req, res) => {
 const { token, data } = req.body;
 if (!token) {
  let msg = "No Token Found";
  return response(res, StatusCodes.BAD_REQUEST, false, token, msg);
 }

 try {
  const result = await verifyToken(token.split("Bearer ")[1]);
  if (result) {
   const user = await User.findById(result._id);
   if (!user || !user.activeStatus) {
    let msg = "Could not authenticate";
    return response(res, StatusCodes.BAD_REQUEST, false, {}, msg);
   }

   const newToken = await createToken(user);
   if (newToken) {
    return response(res, StatusCodes.OK, true, { token: newToken, user }, null);
   }
  } else {
   let msg = "Please Login Again";
   return response(res, StatusCodes.BAD_REQUEST, false, {}, msg);
  }
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

module.exports = { register, login, reLogin };
