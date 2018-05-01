const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/db");

// Database Connection
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log("Connected to the database " + config.database);
});
// Error in database connection
mongoose.connection.on("err", err => {
  console.log("Database Error " + err);
});

const app = express();
const users = require("./routes/users");
const styles = require("./routes/styles");
const orders = require("./routes/orders");
const gen = require("./routes/general");
app.use(cors());
// Body parser middleware
app.use(bodyParser.json());
app.use("/users", users);
// Merchandiser Routes
app.use("/styles", styles);
app.use("/orders", orders);
app.use("/general", gen);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// Set static folder file
app.use(express.static(path.join(__dirname, "public")));

const port = 5000;

app.get("/", (req, res) => {
  res.send("<h1>Hello <h1>");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
