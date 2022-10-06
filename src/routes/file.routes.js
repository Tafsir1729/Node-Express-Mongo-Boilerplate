const { Router } = require("express");
const {
 addFile,
 getFileDetails,
 getAllFiles,
 updateFile,
 deleteFile,
 uploadFile,
 deleteFileFromLocalDir,
} = require("../controllers/file/file.controller");
const { isAdmin, isUser } = require("../utils/protected");

const router = Router();
router.post("/add", isAdmin, isUser, addFile);
router.get("/all", isAdmin, getAllFiles);
router.get("/:id", isAdmin, isUser, getFileDetails);
router.put("/update", isAdmin, isUser, updateFile);
router.delete("/delete/:id", isAdmin, deleteFile);
router.post("/upload", isAdmin, isUser, uploadFile);
router.delete("/delete/local/:id", isAdmin, deleteFileFromLocalDir);

module.exports = router;
