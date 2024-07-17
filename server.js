const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to my restaurant");
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuItemRoutes');

// Use the routes
app.use('/person', personRoutes);
app.use('/menu',MenuItemRoutes)

app.listen(3000, () => {
  console.log("You are listening on port 3000");
});
 