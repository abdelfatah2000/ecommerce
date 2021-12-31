const app = require("express").Router();
const controller = require("../controllers/product.controllers");
const isAuthenticated = require("../../config/isAuth");