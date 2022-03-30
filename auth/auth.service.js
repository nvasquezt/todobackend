const { findOneUser } = require('../api/user/user.service');
const compose = require('composable-middleware');

const jsonwebtoken = require("jsonwebtoken");

/**
 *
 * @param {req} req - The request object.
 * @param {res} res - The response object.
 * @returns {object} - The response object.
 * @description - This function is used to authenticate the user.
 * @returns
 */
function isAuth(){
  return compose().use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).send("No token provided");
  }
  const token = authHeader.split(" ")[1];
  const payload = await verifyToken(token);
  if(!payload){
    return res.status(401).send("Invalid token");
  }
  const user = await findOneUser({username: payload.username});
  if(!user){
    return res.status(401).send("Invalid token");
  }
  req.user = user;
  next();
  });
}

function hasRole(allowedRoles= []){
  return compose().use(isAuth())
  .use(async (req, res, next) => {
    const { role } = req.user;
    if(!allowedRoles.includes(role)){
      return res.status(401).send("You are not authorized");
    }
    next();
    return null;
  });
}

/**
 * Returns a decoded JWT token by the app's secret key.
 * @param {string} token - The JWT token to be verified.
 * @returns {object} - The decoded JWT token.
 */
async function verifyToken(token) {
    try {
        const payload = await jsonwebtoken.verify(token, 'xX/\(O.o)/\XxsecretCodexX/\(O.o)/\Xx');
        return payload;
    } catch (error) {
      return null;
    }
}

/**
 * Returns a JWT token by the app's secret key.
 * @param {string} payload  - The payload to be signed.
 * @returns {string} - The signed JWT token.
 */
function signToken(payload) {
  const token = jsonwebtoken.sign(payload, 'xX/\(O.o)/\XxsecretCodexX/\(O.o)/\Xx', { expiresIn: '2h' });
  return token;
}

module.exports = {
  signToken,
  verifyToken,
  isAuth,
  hasRole,
};
