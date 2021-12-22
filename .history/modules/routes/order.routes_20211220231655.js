const app = require("express").Router();
const controller = require("../controllers/.controllers");
const isAuthenticated = require("../../config/isAuth");

app.post("/addOrder", isAuthenticated(), controller.)