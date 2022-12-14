require("./src/config/conn");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(fileUpload());
app.use(cors());

app.use(express.static(path.join(__dirname, "/uploads")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRoute = require("./src/routes/auth.routes");
const userRoute = require("./src/routes/user.routes");
const fileRoute = require("./src/routes/file.routes");

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/file", fileRoute);

app.get("/", (req, res) => {
 res.send("<div><h1>Server is Running</h1></div>");
});

var port = process.env.PORT || 5000;

app.listen(port, () => {
 console.log("Server is Running on " + port);
});
