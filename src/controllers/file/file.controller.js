const { File } = require("../../models/File.model");
const { StatusCodes } = require("http-status-codes");
const { response } = require("../../utils/response");
const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");
const { blobUrl, blobConnStr, containerName } = require("../../config/config");

const addFile = async (req, res) => {
 const { name } = req.body;
 if (!name) {
  let msg = "Name is required!";
  return response(res, StatusCodes.BAD_REQUEST, false, null, msg);
 }
 const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnStr);
 const containerClient = blobServiceClient.getContainerClient(containerName);
 const { file } = req.files;
 const fileFormat = file.name.split(".").pop();
 const blobOptions = {
  blobHTTPHeaders: { blobContentType: file.mimetype },
 };
 const blobName = uuidv4() + "." + fileFormat;

 try {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(
   file.data,
   file.data.length,
   blobOptions
  );
  const fileReturn = await File.create({
   name,
   blobName,
   type: file.mimetype,
   size: file.size,
  });
  const data = {
   id: fileReturn._id,
   name: name,
   size: file.size,
   file: photoURLReturn(blobName),
   type: file.mimetype,
  };
  return response(res, StatusCodes.ACCEPTED, true, data, null);
 } catch (err) {
  let msg = "This file can't be uploaded!";
  return response(
   res,
   StatusCodes.INTERNAL_SERVER_ERROR,
   false,
   err.message,
   msg
  );
 }
};

module.exports = { addFile };
