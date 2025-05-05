"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const app = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = "sUperpassw0rd!";
const someOtherPlaintextPassword = "pass123";

//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
    return;
  }
  console.log("Hashed password:", hash);

  // Compare with correct password
  bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    if (err) {
      console.error("Error comparing password:", err);
      return;
    }
    console.log("Comparison with correct password:", res); // Should be true
  });

  // Compare with incorrect password
  bcrypt.compare(someOtherPlaintextPassword, hash, (err, res) => {
    if (err) {
      console.error("Error comparing password:", err);
      return;
    }
    console.log("Comparison with incorrect password:", res); // Should be false
  });
});
//END_ASYNC

//START_SYNC

//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
