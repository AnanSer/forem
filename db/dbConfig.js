const mysql2 = require("mysql2");

const dbconnection = mysql2.createConnection({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "localhost",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

// dbconnection.execute("select * from users", (err, results, fields) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(results);
// });

module.exports = dbconnection.promise();
