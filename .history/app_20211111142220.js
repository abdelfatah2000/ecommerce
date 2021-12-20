const express = require("express");
const app = express();
require("dotenv").config();


const connection = require("./config/db");
connection();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const users = require("./modules/users/routes/user.routes");
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
