const { Router } = require("express");
const { createUser } = require("../controllers/user.controller");
const { isAdmin } = require("../utils/protected");

const router = Router();
router.post("/create", isAdmin, createUser);

module.exports = router;
