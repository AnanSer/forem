const dbConnection = require("../db/dbConfig");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!email || !password || !username || !firstname || !lastname) {
    return res.status(401).json({ msg: "provide all required fields" });
  }
}

async function login(req, res) {
  // register user
  res.send("login");
}

async function checkUser(req, res) {
  // register user
  res.send("check user");
}

module.exports = { register, login, checkUser };
