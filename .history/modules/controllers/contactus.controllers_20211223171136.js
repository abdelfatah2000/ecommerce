const Contact = require("../model/contactus.models");
const { StatusCodes } = require("http-status-codes");

exports. = async (req, res) => {
  try {
    const payload = req.body;
    const data = new Contact(payload);
    await data.save();
    res.status(StatusCodes.CREATED).json({ message: "Done" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};
