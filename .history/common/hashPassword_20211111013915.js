const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, Number(process.env.SALTROUNDS));
  return hash;
};

const comparePassword = async (password, hashedPassword) => {
  const isMatched = await bcrypt.compare(password, hashedPassword)
  console.log(isMatched)
  return isMatched;
};

module.exports = {
  hashPassword,
  comparePassword,
};