const { Router } = require("express");
const {
 register,
 login,
 reLogin,
} = require("../controllers/auth/auth.controller");
const { authValidation } = require("../controllers/auth/auth.validator");

const router = Router();
router.post("/register", authValidation, register);
router.post("/login", login);
router.post("/re-login", reLogin);

module.exports = router;
