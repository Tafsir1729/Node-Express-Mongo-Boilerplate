const { StatusCodes } = require("http-status-codes");
const { verify } = require("jsonwebtoken");
const { User } = require("../models/User.model");
const { config } = require("./config");

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

module.exports = { verifyToken };
