//###########################################

const showError = (req, res, next) => {
  console.log("I am an Error");

  const objErr = new Error("I am an Error");
  next(objErr);
};

//###########################################

module.exports = { showError };
