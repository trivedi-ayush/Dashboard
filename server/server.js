require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/auth-routes");
const dbconnect = require("./utils/db");
const bodyParser = require("body-parser");


// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/auth", router);

const port = 3005;

dbconnect().then(
  app.listen(port, (req, res) => {
    console.log(`port is running on ${port}`);
  })
);
