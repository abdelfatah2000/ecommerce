const Contact = require("../model/contactus.models");
const { StatusCodes } = require("http-status-codes");

const addmessage = async (req, res) => {
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

const getallmessages = async (req,res) => {
  try {
    const data = await Contact.find({});
    res.status(StatusCodes.OK).json({ data});
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please try again", error });
  }
};


const deleteMessage = async (req, res) => {
  await Contact.findByIdAndDelete
}
module.exports = {
  addmessage,
  getallmessages,

}