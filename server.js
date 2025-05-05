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
  if (err) throw err;
  console.log("Async hash:", hash);

  // Compare the original password with the hash
  bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
    if (err) throw err;
    console.log("Async compare (matching):", result); // true
  });

  // Compare a different password with the hash
  bcrypt.compare(someOtherPlaintextPassword, hash, (err, result) => {
    if (err) throw err;
    console.log("Async compare (not matching):", result); // false
  });
});
//END_ASYNC

//START_SYNC
try {
  const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
  console.log("Sync hash:", hash);

  const match = bcrypt.compareSync(myPlaintextPassword, hash);
  console.log("Sync compare (matching):", match); // true

  const notMatch = bcrypt.compareSync(someOtherPlaintextPassword, hash);
  console.log("Sync compare (not matching):", notMatch); // false
} catch (err) {
  console.error(err);
}
//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
