const { Router } = require("express");
const {
 createUser,
 getUsers,
 getUserDetails,
} = require("../controllers/user.controller");
const { isAdmin, isUser } = require("../utils/protected");

const router = Router();
router.post("/create", isAdmin, createUser);
router.get("/all", isAdmin, getUsers);
router.get("/:id", isAdmin, isUser, getUserDetails);

module.exports = router;
