const { Router } = require("express");
const {
 addFile,
 getFileDetails,
 getAllFiles,
} = require("../controllers/file/file.controller");
const { isAdmin, isUser } = require("../utils/protected");

const router = Router();
router.post("/add", isAdmin, isUser, addFile);
router.get("/all", isAdmin, getAllFiles);
router.get("/:id", isAdmin, isUser, getFileDetails);

module.exports = router;
