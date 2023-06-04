const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { UserManager } = require("../../model/userModel");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dbUser = await UserManager.getUserByEmail(email);
    if (!dbUser) {
      return res.status(401).json("Invalid email or password!").end();
    }
  
    const encryptedPassword = encryptPassword(password);
    const dbPassword = dbUser.password;
  
    if (encryptedPassword != dbPassword) {
      return res.status(401).json("Invalid email or password!").end();
    }
    
    const userUuid = dbUser.userUuid
  
    const token = jwt.sign({ userUuid }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: 3000,
    });
  
    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json('Something went wrong');
  }
};

const encryptPassword = (password) => {
  return CryptoJS.MD5(password).toString();
}

module.exports = loginController;
