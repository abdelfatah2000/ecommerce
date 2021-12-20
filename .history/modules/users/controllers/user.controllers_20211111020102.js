const User = require("../model/users.models");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
} = require("../../../common/hashPassword");

const addUser = async (req,res) => {
  try {
    const payload = req.body
  } catch (error) {

  }
}