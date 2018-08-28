const mongoose = require("mongoose");
const user = require("../models/User");

const dbName = "lab-passport-roles";
mongoose.connect(`mongodb://localhost/${dbName}`);

const users = [
  {
    email: "boss@boss.com",
    password: "123",
    role: "Boss"
  }
];

user.create(users, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${users.length} users`);
  mongoose.connection.close();
});
//seed -------------------------