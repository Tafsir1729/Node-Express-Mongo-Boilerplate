var { Schema, model } = require("mongoose");

var FileSchema = Schema(
 {
  name: {
   type: String,
   require: true,
  },
  blobName: {
   type: String,
   required: true,
  },
  type: {
   type: String,
   required: true,
  },
  size: {
   type: Number,
   required: true,
  },
 },
 { timestamps: true }
);

const File = model("file", FileSchema);
module.exports = { File };
