const { StatusCodes } = require("http-status-codes")

const Validation = (schema) => {
  return (req, res, next) => {
    const error = [];
    const requesrHeaders = ["body","params","query"];
    requesrHeaders.forEach((key => {
      if(schema[key]) {
        const validateResult = schema[key].validate(req[key]);
      }
    }))
  }
}
