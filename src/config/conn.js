const { connect } = require("mongoose");
const { dbConnectionString } = require("./db");

connect(dbConnectionString, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
})
 .then(() => {
  console.log("Database Connected");
 })
 .catch((e) => {
  console.log("Database Connection Error");
 });
