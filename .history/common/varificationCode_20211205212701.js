const crypto = require("crypto");
const { ConfirmCode } = require("../modules/model/users.models");

const generateCode = async function (id) {
  var code;
  const confirmationCode = Math.floor(Math.random() * 100000);
  if (confirmationCode.toString().length < 5) {
    code = confirmationCode.toString() + "0";
  } else {
    code = confirmationCode.toString();
  }
  console.log(code);
  const hashCode = crypto.createHash("sha256").update(code).digest("hex");
  const expireDate = Date.now() + 10 * 60 * 1000;
  const confirmCode = new ConfirmCode({
    userId: id,
    code: hashCode,
    expireDate,
  });
  await confirmCode.save();
};

module.exports = 