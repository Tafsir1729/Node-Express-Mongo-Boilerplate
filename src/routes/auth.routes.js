const { Router } = require("express");
const { register, login, reLogin } = require("../controllers/auth.controller");

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/re-login", reLogin);

module.exports = router;
