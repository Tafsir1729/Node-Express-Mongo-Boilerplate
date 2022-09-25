var { Schema, model } = require("mongoose");

var UserSchema = Schema(
 {
  name: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   required: true,
  },
  password: {
   type: String,
   required: true,
  },
  activeStatus: Boolean,
  userType: {
   type: String,
   required: true,
  },
  phone: {
   type: String,
  },
 },
 { timestamps: true }
);

const User = model("user", UserSchema);
module.exports = { User };
