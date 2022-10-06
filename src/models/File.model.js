var { Schema, model } = require("mongoose");

var FileSchema = Schema(
 {
  name: {
   type: String,
   required: true,
  },
  blobName: {
   type: String,
  },
  type: {
   type: String,
  },
  size: {
   type: Number,
  },
 },
 { timestamps: true }
);

const File = model("file", FileSchema);
module.exports = { File };
