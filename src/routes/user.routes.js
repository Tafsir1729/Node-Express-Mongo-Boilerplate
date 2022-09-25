const { Router } = require("express");
const { createUser, getUsers } = require("../controllers/user.controller");
const { isAdmin } = require("../utils/protected");

const router = Router();
router.post("/create", isAdmin, createUser);
router.get("/all", isAdmin, getUsers);

module.exports = router;
