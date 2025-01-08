const dbConnection = require("../db/dbConfig");

const bcyrypt = require("bcrypt");

const { StatusCodes } = require("http-status-codes");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!email || !password || !username || !firstname || !lastname) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "provide all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user.length > 0)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already exists" });

    if (password.length < 6) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 6 characters" });

      return res.json({ users: user });
    }

    // encrypt password
    const salt = await bcyrypt.genSalt(10);
    const hashedPassword = await bcyrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "user registered successfully" });
  } catch (err) {
    console.error("Database error:", err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "something went wrong, try again later",
      error: err.message,
    });
  }
}

async function login(req, res) {
  // register user

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "provide all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (user.length === 0)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user does not exist" });

    // compare password
    const isMatch = await bcyrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }

    return res.json({ user: user[0].password });
  } catch {
    console.error("Database error:", err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json;
  }
}

async function checkUser(req, res) {
  // register user
  res.send("check user");
}

module.exports = { register, login, checkUser };
