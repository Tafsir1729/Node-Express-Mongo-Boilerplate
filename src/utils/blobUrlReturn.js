const { blobUrl } = require("../config/config");

const returnBlobUrl = (data) => {
 return data ? blobUrl + data : null;
};

module.exports = { returnBlobUrl };
