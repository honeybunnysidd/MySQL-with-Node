const express = require("express");
const path = require("path");
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const methodOverride = require("method-override");

const app = express();

app.use(methodOverride("_method"));

//express understand the client's data for all type of Request
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//Set view engine to ejs
app.set("view engine", "ejs");

//Set path of ejs file
app.set("views", path.join(__dirname, "views"));

//set path of static file(CSS and Js)
app.use(express.static(path.join(__dirname, "public")));

//Creating fake data
let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// console.log(createRandomUser());

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "myapp",
  password: "Siddhartha123@",
});

// A simple SELECT query
/*
let q = "SHOW TABLES";
try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log(result.length);
  });
} catch (err) {
  console.log(err);
}
*/
// INSERT new User (With placeholder?)
/*
let quer = "INSERT INTO users (id, username, email, password) VALUES ?";
let users = [
  ["123a", "123_newusera", "abca@gmail.com", "abca"],
  ["123b", "123_newuserb", "abcb@gmail.com", "abcab"],
  ["123c", "123_newuserc", "abcc@gmail.com", "abcbc"],
];
connection.query(quer, [users], (err, result) => {
  if (err) {
    console.log("err: ", err);
    return;
  }
  console.log(result);
});
*/

// INSERT data using faker
/*
let newQuery = "INSERT INTO users (id,username,email ,password) VALUES ?";

let allUsers = [];

for (let i = 1; i <= 100; i++) {
  allUsers.push(createRandomUser());
}

connection.query(newQuery, [allUsers], (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});
*/

//End the connection
// connection.end();

//Home routes
app.get("/", (req, res) => {
  let q = `SELECT count(id) FROM users`;

  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let totalUser = result[0]["count(id)"];
      res.render("home", { totalUser });
    });
  } catch (err) {
    res.send("Some error in DB");
  }
});

//show all users id email
app.get("/user", (req, res) => {
  let q = `SELECT * FROM users`;
  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      res.render("user", { result });
    });
  } catch (err) {
    res.send("Some error occur");
  }
});

//Edit exisitng data through user's password
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;

  let q = `SELECT * FROM users WHERE id = "${id}"`;

  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let user = result[0];
      res.render("edit", { user });
    });
  } catch (err) {
    res.send("Some error occur");
  }
});

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { username, password } = req.body;

  let q = `SELECT * FROM users WHERE id = "${id}"`;

  try {
    connection.query(q, (err, result) => {
      if (err) {
        throw err;
      }
      let user = result[0];
      if (password != user.password) {
        res.send("Password incorrect");
      } else {
        let q2 = `UPDATE users SET username = "${username}" WHERE id = "${id}"`;

        connection.query(q2, (err, result) => {
          if (err) {
            throw err;
          }
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    res.send("Some error occur");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});