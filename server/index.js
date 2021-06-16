// server/index.js

const express = require("express");
const fs = require('fs')
const csv = require('csv-parser')
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

app.get("/api", (req, res) => {
  res.json({ message: "Baby Name Generator v1.0" });
});

app.get("/name", (req, res) => {
    let n = Math.floor(Math.random() * names.length);
    res.json({ message: names[n] });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});