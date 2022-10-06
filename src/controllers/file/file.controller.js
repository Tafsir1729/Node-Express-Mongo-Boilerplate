const { File } = require("../../models/File.model");
const { StatusCodes } = require("http-status-codes");
const { response } = require("../../utils/response");
const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");
const { returnBlobUrl } = require("../../utils/blobUrlReturn");
const { blobUrl, blobConnStr, containerName } = require("../../config/config");

const addFile = async (req, res) => {
 const { name } = req.body;
 const { file } = req.files ? req.files : false;
 if (!name || !file) {
  let msg = "name and file are required!";
  return response(res, StatusCodes.BAD_REQUEST, false, null, msg);
 }

 try {
  const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnStr);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const fileFormat = file.name.split(".").pop();
  const blobOptions = {
   blobHTTPHeaders: { blobContentType: file.mimetype },
  };
  const blobName = uuidv4() + "." + fileFormat;
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
   file: returnBlobUrl(blobName),
   type: file.mimetype,
  };
  return response(res, StatusCodes.CREATED, true, data, null);
 } catch (err) {
  return response(
   res,
   StatusCodes.INTERNAL_SERVER_ERROR,
   false,
   {},
   err.message
  );
 }
};

const getFileDetails = async (req, res) => {
 const { id } = req.params;
 try {
  const file = await File.findById(id).select("name blobName type size");
  if (!file) {
   let msg = "No file found!";
   return response(res, StatusCodes.NOT_FOUND, false, {}, msg);
  }
  return response(res, StatusCodes.OK, true, { file: file }, null);
 } catch (err) {
  return response(
   res,
   StatusCodes.INTERNAL_SERVER_ERROR,
   false,
   {},
   err.message
  );
 }
};

const getAllFiles = async (req, res) => {
 try {
  const file = await File.find();
  let modifiedList = [];
  file.map((x) => {
   let data = {
    id: x._id,
    name: x.name,
    size: x.size / 1000 + " kb",
    url: returnBlobUrl(x.blobName),
    type: x.type ? x.type : "unknown",
   };
   modifiedList.push(data);
  });
  return response(res, StatusCodes.OK, true, modifiedList, null);
 } catch (err) {
  return response(
   res,
   StatusCodes.INTERNAL_SERVER_ERROR,
   false,
   {},
   err.message
  );
 }
};

const updateFile = async (req, res) => {
 const { id, name } = req.body;
 const { file } = req.files ? req.files : false;
 if (!name || !id || !file) {
  let msg = "name, id and file are required!";
  return response(res, StatusCodes.BAD_REQUEST, false, null, msg);
 }

 try {
  const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnStr);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  let data = {
   name,
  };
  if (file) {
   const fileFormat = file.name.split(".").pop();
   const blobOptions = {
    blobHTTPHeaders: { blobContentType: file.mimetype },
   };
   const blobName = uuidv4() + "." + fileFormat;
   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
   const uploadBlobResponse = await blockBlobClient.upload(
    file.data,
    file.data.length,
    blobOptions
   );
   data.blobName = blobName;
   data.type = file.mimetype;
   data.size = file.size;
  }
  const fileReturn = await File.findByIdAndUpdate(id, data, {
   new: true,
  }).exec();
  return response(res, StatusCodes.ACCEPTED, true, { file: fileReturn }, null);
 } catch (err) {
  return response(
   res,
   StatusCodes.INTERNAL_SERVER_ERROR,
   false,
   {},
   err.message
  );
 }
};

const deleteFile = async (req, res) => {
 const { id } = req.params;
 if (!id) {
  let msg = "No File Found!";
  return response(res, StatusCodes.NOT_FOUND, false, {}, msg);
 }
 try {
  const file = await File.findByIdAndDelete(id).exec();
  if (!file) {
   let msg = "Could not delete!";
   return response(res, StatusCodes.BAD_REQUEST, false, [], msg);
  }
  return response(res, StatusCodes.ACCEPTED, true, [], null);
 } catch (err) {
  return response(
   res,
   StatusCodes.INTERNAL_SERVER_ERROR,
   false,
   {},
   error.message
  );
 }
};

module.exports = {
 addFile,
 getFileDetails,
 getAllFiles,
 updateFile,
 deleteFile,
};
