const path = require("path");

//gives the path of the file that runs the app
module.exports = path.dirname(process.mainModule.filename);
