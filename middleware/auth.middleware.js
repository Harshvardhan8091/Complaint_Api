const auth = (req, res, next) => {
  console.log("Auth checked");
  next();
};

export default auth;
