// server/index.js

const express = require("express");
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const names = [];

const PORT = process.env.PORT || 3001;

const app = express();


fs.createReadStream("../BabyNamer/server/names.csv")
  .pipe(csv())
  .on('data', function (row) {
    const name = row.Firstname;
    names.push(name)
  })
  .on('end', function () {
      //console.table(names);
      //console.log(names);
      // TODO: SAVE users data to another file
    })

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Baby Name Generator v1.0" });
});

app.get("/name", (req, res) => {
    let n = Math.floor(Math.random() * names.length);
    res.json({ message: names[n] });
  });

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});




