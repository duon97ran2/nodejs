import expressJWT from "express-jwt";

export const checkAuth = (req, res, next) => {
  const isAdmin = true;
  if (isAdmin) {
    return next();
  }
  console.log("cut");
}
export const requiredSignin = expressJWT({
  secret: "123456",
  algorithms: ['HS256'],
  requestProperty: "auth"
});
export const isAuth = (req, res, next) => {
  const status = req.profile._id == req.auth.id;
  if (!status) {
    res.status(400).json({
      message: "Authorization error, user not found"
    })
  }; next()
}
export const isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    res.status(401).send({
      message: "Access denied, administration required ",
    })
  }
  next();

}