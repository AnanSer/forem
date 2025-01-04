const express = require("express");
const router = express();

//register route
router.post("/register", (req, res) => {
  // register user
  res.send("register");
});

router.post("/login", (req, res) => {
  // register user
  res.send("login");
});

// check user
router.get("/check", (req, res) => {
  // register user
  res.send("check user");
});

module.exports = router;
