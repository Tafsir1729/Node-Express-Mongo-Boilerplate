const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const { dbConnectionString } = require("./src/config/db");
const path = require("path");

const app = express();
app.use(fileUpload());
app.use(cors());

try {
 connect(
  dbConnectionString,
  {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  },
  () => {
   console.log("Database Connected");
  }
 );
} catch (err) {
 console.log("Database Connection Error");
}

app.use(express.static(path.join(__dirname, "/uploads")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRoute = require("./src/routes/auth.routes");
app.use("/auth", authRoute);

var port = process.env.PORT || 5000;

app.listen(port, () => {
 console.log("Server is Running on " + port);
});
