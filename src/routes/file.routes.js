const { Router } = require("express");
const {
 addFile,
 getFileDetails,
} = require("../controllers/file/file.controller");
const { isAdmin, isUser } = require("../utils/protected");

const router = Router();
router.post("/add", isAdmin, isUser, addFile);
router.get("/:id", isAdmin, getFileDetails);

module.exports = router;
