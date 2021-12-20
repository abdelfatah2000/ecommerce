const { StatusCodes } = require("http-status-codes");

const Validation = (schema) => {
  return (req, res, next) => {
    const error = [];
    const requesrHeaders = ["body", "params", "query"];
    requesrHeaders.forEach((key) => {
      if (schema[key]) {
        const validateResult = schema[key].validate(req[key]);
        if (validateResult.error) {
          error.push(validateResult.error.details[0].message);
        }
      }
    });
    if (error.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `validation : ${error.join()}` });
    } else {
      next();
    }
  };
};
