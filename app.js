const express = require("express");
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

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

//End the connection
connection.end();
