const User = require("../models/userModels");
const validator = require("validator");

// sign up;
const UserRegister = async (req, res) => {
  const { name, email, password, image } = req.body;

  if (!name || !password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Fill all the credentials !!!" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(200)
      .json({ success: false, message: "Email is Incorrect !!!" });
  }
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(200)
        .json({ success: false, message: "User already Exist !!!" });
    }

    user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.image = image
      ? image
      : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";

    user.save().then(
      async (us) => {
        //    console.log(`User Created :: ${us}`);
        res.status(200).json({
          success: true,
          message: "Successful register",
          _id: us._id,
          name: us.name,
          email: us.email,
          image: us.image,
          isAdmin: us.isAdmin,
          cartData: user.cartData,
          token: "Bearer " + (await us.generateToken()),
        });
      },
      (error) => {
        console.log(`Error in saving new user :: ${error}`);
      }
    );
  } catch (error) {
    res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};

//login
const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res
      .status(400)
      .json({ success: false, message: "Fill all the credentials !!!" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User does not exist !!!" });
    }
    //     console.log(await user.comparePassword(password));
    if (!(await user.comparePassword(password))) {
      return res
        .status(200)
        .json({ success: false, message: "Password is incorrect !!!" });
    }

    res.status(200).json({
      success: true,
      message: "Login successfull",
      _id: user._id,
      name: user.name,
      image: user.image,
      email: user.email,
      isAdmin: user.isAdmin,
      cartData: user.cartData,
      token: "Bearer " + (await user.generateToken()),
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};

module.exports = { UserRegister, UserLogin };
