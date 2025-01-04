const express = require("express");
const app = express();
const port = 5500;

// user routes middleware file
const userRoutes = require("./routes/userRoute");

// user routes middleware
app.use("/api/users", userRoutes);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("listening on ${port}");
});
