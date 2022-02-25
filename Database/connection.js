//########################################################################
const mongoose = require("mongoose");

//########################################################################

const connection = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connection;
