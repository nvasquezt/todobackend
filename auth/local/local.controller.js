const { getUserByUsername } = require("../../api/user/user.service");
const { signToken } = require("../../auth/auth.service");

const handlerLoginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (!user) {
      return res.status(401).send(`User with username ${ username } not found`);
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
      return res.status(401).send("Invalid password");
  }
  const token = signToken(user.profile);
  res.status(200).send(token);
};

module.exports = {
  handlerLoginUser,
};
