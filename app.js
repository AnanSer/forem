const mysql2 = require("mysql2");

const dbconnection = mysql2.createConnection({
  user: "forum-admin",
  database: "question-forum",
  host: "localhost",
  password: "admin1234",
  connectionLimit: 10,
});

dbconnection.execute("select * from users", (err, results, fields) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(results);
});
