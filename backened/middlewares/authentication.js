const jwt = require("jsonwebtoken");

const authenication = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized Login again !!!",
    });
  }
  token = token.split(" ")[1];
  try {
    let userDetails = await jwt.verify(token, process.env.JWT_SIGN_KEY);
    req.userDetails = userDetails;
    // console.log(userDetails);
    next();
  } catch (error) {
    console.log(`Error in authentication middleware  ::${error}`);
  }
};
module.exports = authenication;

// {
//   userId: '66cb82807a9cb152274e682b',
//   email: 'rjrahulraj0007@gmail.com',
//   name: 'Rahul Raj',
//   iat: 1724938252,
//   exp: 1727530252
// }
