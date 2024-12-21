//Uppgift 2
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const server = express();
const port = 3000;

// Middleware för JSON, URL-enkodning och CORS
server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

// Skapa anslutning till databasen / Uppgift 3
const db = new sqlite3.Database("./gik339-labb2.db", (err) => {
  if (err) {
    console.error("Fel vid anslutning till databasen:", err.message);
  } else {
    console.log("Ansluten till databasen.");
  }
});

// GET-route för "/users" /Uppgift 3
server.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      console.error("Fel vid hämtning av användare:", err.message);
      res.status(500).send("Något gick fel vid hämtning av data");
    } else {
      res.json(rows);
    }
  });
});

// Root-route för att visa en HTML-sida
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Starta servern / Uppgift 2
server.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});
