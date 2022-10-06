const { Router } = require("express");
const { addFile } = require("../controllers/file/file.controller");

const router = Router();
router.post("/add", addFile);

module.exports = router;
