const mongoose = require("mongoose");
const user = require("../models/User");

const dbName = "lab-passport-roles";
mongoose.connect(`mongodb://localhost/${dbName}`);

const users = [
  {
    email: "boss2@boss.com",
    password: "123",
    role: "Boss"
  },
  {
    email: "boss3@boss.com",
    password: "123",
    role: "Boss"
  },
  {
    email: "user2.com",
    password: "123",
    role: "TA"
  },
  {
    email: "user3.com",
    password: "123",
    role: "TA"
  },
  {
    email: "user4.com",
    password: "123",
    role: "Developer"
  },
  {
    email: "user5.com",
    password: "123",
    role: "Developer"
  },
];

user.create(users, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${users.length} users`);
  mongoose.connection.close();
});
//seed -------------------------