function register(req, res) {
  // register user
  res.send("register");
}

function login(req, res) {
  // register user
  res.send("login");
}

function checkUser(req, res) {
  // register user
  res.send("check user");
}

module.exports = { register, login, checkUser };
