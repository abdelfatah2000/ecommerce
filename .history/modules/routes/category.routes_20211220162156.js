const app = require("express").Router();
const controller = require("../controllers/c.controllers");
const isAuthenticated = require("../../config/isAuth");