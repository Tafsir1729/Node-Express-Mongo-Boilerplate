const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models/User.model");
const { response } = require("../../utils/response");
const { securePassword } = require("../../utils/securePassword");

const createUser = async (req, res) => {
 const { name, email, password, phone, userType } = req.body;
 try {
  const oldUser = await User.findOne({
   email: email,
  });
  if (oldUser) {
   let msg = "User already exists.";
   return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
  }

  const hashedPassword = await securePassword(req.body.password);

  const user = await User.create({
   email: email,
   name: name,
   phone: phone,
   password: hashedPassword,
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

const getUsers = async (req, res) => {
 const { skip, limit, activeStatus, searchKey, sortBy } = req.body;

 try {
  const usersCount = await User.countDocuments()
   .where(
    searchKey
     ? {
        $or: [
         {
          name: { $regex: searchKey, $options: "i" },
         },
         {
          email: { $regex: searchKey, $options: "i" },
         },
         {
          phone: { $regex: searchKey, $options: "i" },
         },
        ],
       }
     : null
   )
   .where(activeStatus !== undefined ? { activeStatus: activeStatus } : null);

  const users = await User.find()
   .select("name email phone userType activeStatus")
   .where(
    searchKey
     ? {
        $or: [
         {
          name: { $regex: searchKey, $options: "i" },
         },
         {
          email: { $regex: searchKey, $options: "i" },
         },
         {
          phone: { $regex: searchKey, $options: "i" },
         },
        ],
       }
     : null
   )
   .where(activeStatus !== undefined ? { activeStatus: activeStatus } : null)
   .sort(sortBy ? { [sortBy.field]: [sortBy.order] } : { createdAt: -1 })
   .limit(limit ? limit : null)
   .skip(skip ? skip : null);

  if (!users || users.length === 0) {
   let msg = "No users Found";
   return response(res, StatusCodes.NOT_FOUND, false, {}, msg);
  }

  return response(
   res,
   StatusCodes.OK,
   true,
   { usersCount: usersCount, users: users },
   null
  );
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

const getUserDetails = async (req, res) => {
 const { id } = req.params;

 try {
  const user = await User.findById(id).select(
   "name email phone activeStatus userType"
  );
  if (!user) {
   let msg = "No user Found!";
   return response(res, StatusCodes.NOT_FOUND, false, {}, msg);
  }

  return response(res, StatusCodes.OK, true, { user: user }, null);
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

const updateUserDetails = async (req, res) => {
 const { name, phone, userType } = req.body;
 const id = req.params.id;
 let user = {};
 if (name) {
  user.name = name;
 }
 if (phone) {
  user.phone = phone;
 }
 if (userType) {
  user.userType = userType;
 }

 if (user) {
  user.updatedAt = new Date();
  try {
   const newUser = await User.findByIdAndUpdate(id, user, {
    new: true,
   }).exec();
   if (!newUser) {
    let msg = "Could not update";
    return response(res, StatusCodes.BAD_REQUEST, false, {}, msg);
   }

   return response(res, StatusCodes.ACCEPTED, true, { user: newUser }, null);
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
  let msg = "Could not update";
  return response(res, StatusCodes.BAD_REQUEST, false, {}, msg);
 }
};

const deleteUser = async (req, res) => {
 const id = req.params.id;
 if (!id) {
  let msg = "No User Found!";
  return response(res, StatusCodes.NOT_FOUND, false, {}, msg);
 }

 try {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
   let msg = "Could not delete!";
   return response(res, StatusCodes.BAD_REQUEST, false, {}, msg);
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

module.exports = {
 createUser,
 getUsers,
 getUserDetails,
 updateUserDetails,
 deleteUser,
};
