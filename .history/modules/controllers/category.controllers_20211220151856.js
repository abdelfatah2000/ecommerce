const Category = require('../model/category.models');

const addCategory = async (req,res) => {
  try{
    const payload = req.body;
    if (req.file) payload.imgURL = req.file.path;
    const category = new Category(payload);
  }
};

