const express = require("express");
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

//Creating fake data
let createRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
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
try {
  connection.query("SHOW TABLES", (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}

//End the connection
connection.end();