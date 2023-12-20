// Create web server
// Create database
// Create table
// Insert data
// Select data
// Update data
// Delete data
// Close database
// Close web server

// 1. Create web server
var express = require("express");
var app = express();
var port = 3000;
app.listen(port, function() {
  console.log("Server is listening on port " + port);
});

// 2. Create database
var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database("myDatabase.db");

// 3. Create table
db.serialize(function() {
  // Create a table named "comments"
  db.run(
    "CREATE TABLE if not exists comments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, content TEXT)"
  );
});

// 4. Insert data
app.get("/create", function(req, res) {
  // Insert a row of data
  db.run(
    "INSERT INTO comments (name, content) VALUES (?, ?)",
    ["John", "Hello"],
    function(err) {
      if (err) {
        return console.log(err.message);
      }
      // Get the last insert id
      console.log("A row has been inserted with rowid " + this.lastID);
      res.send("A row has been inserted with rowid " + this.lastID);
    }
  );
});

// 5. Select data
app.get("/read", function(req, res) {
  // Select all data
  db.all("SELECT * FROM comments", [], (err, rows) => {
    if (err) {
      throw err;
    }
    // Print all data
    rows.forEach(row => {
      console.log(row.id + " " + row.name + " " + row.content);
      res.write(row.id + " " + row.name + " " + row.content + "\n");
    });
    res.end();
  });
});

// 6. Update data
app.get("/update", function(req, res) {
  // Update data
  db.run(
    "UPDATE comments SET content = ? WHERE id = ?",
    ["Hi", 1],
    function(err) {
      if (err) {
        return console.log(err.message);
      }
      // Print the number of rows updated
      console.log("Row(s) updated: " + this.changes);
      res.send("Row(s) updated: " + this.changes);