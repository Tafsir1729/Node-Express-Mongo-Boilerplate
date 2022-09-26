const { Router } = require("express");
const {
 createUser,
 getUsers,
 getUserDetails,
 updateUserDetails,
 deleteUser,
} = require("../controllers/user/user.controller");
const { isAdmin, isUser } = require("../utils/protected");
const { userValidation } = require("../controllers/user/user.validator");

const router = Router();
router.post("/create", isAdmin, createUser);
router.get("/all", isAdmin, getUsers);
router.get("/:id", isAdmin, isUser, getUserDetails);
router.put("/update/:id", isAdmin, isUser, updateUserDetails);
router.delete("/delete/:id", isAdmin, deleteUser);

module.exports = router;
