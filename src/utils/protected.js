const { StatusCodes } = require("http-status-codes");
const { verify } = require("jsonwebtoken");
const { User } = require("../models/User.model");
const { config } = require("./config");
const { response } = require("./response");

const verifyToken = async (token) => {
 if (!token) return;
 try {
  const payload = await verify(token, config.secrets.jwt);
  const user = await User.findById(payload._id);
  if (user) return user;
  else return;
 } catch (error) {
  return;
 }
};

const isUser = async (req, res, next) => {
 if (req.headers.authorization) {
  try {
   const user = await verifyToken(
    req.headers.authorization.split("Bearer ")[1]
   );
   if (user) {
    req.user = user;
    next();
   } else {
    let msg = "Not Authenticated";
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
 } else {
  let msg = "Authentication Token not found";
  return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
 }
};

const isAdmin = async (req, res, next) => {
 if (req.headers.authorization) {
  try {
   const user = await verifyToken(
    req.headers.authorization.split("Bearer ")[1]
   );
   if (user && user.userType === "admin") {
    req.user = user;
    next();
   } else {
    let msg = "Not Authenticated";
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
 } else {
  let msg = "Authentication Token not found";
  return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
 }
};

module.exports = { verifyToken, isUser, isAdmin };
