const { connect } = require("mongoose");

const dbConnectionString = "mongodb+srv://boilerplate:uPWDd2eHDprxQz5G@cluster0.ljesluc.mongodb.net/?retryWrites=true&w=majority";

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
