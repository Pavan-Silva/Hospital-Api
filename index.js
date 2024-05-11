require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/test", function (req, res) {
  res.send("API is running");
});

mongoose
  .connect(process.env.MONGODB_CONN_STRING)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  })
  .catch((err) => {
    console.log(err);
  });
