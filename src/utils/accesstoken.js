import jsonwebtoken from "jsonwebtoken"


export const generateToken = (data, option) => {
  return jsonwebtoken.sign(data, process.env.SECRET_KEY, option);
}

export const verifyToken = (token, callback) => {
  jsonwebtoken.verify(token, process.env.SECRET_KEY, (error, user) => {
    callback(user, error);
  });
}