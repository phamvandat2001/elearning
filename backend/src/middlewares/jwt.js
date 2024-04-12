const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  // const authorization = req.header['Authorization'];
  // const [, token] = authorization.split(' ');

  // if (!token) {
  //   return res.status(401).send({ error: "Token is missing!" });
  // }

  // try {
  //   jwt.sign(token, process.env.ACCESS_TOKEN_SECRET);
  //   next();
  // } catch (error) {
  //   return res.status(403).send({ error: "Token is invalid!" });
  // }
  next();
}

module.exports = verifyToken;