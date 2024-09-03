const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
    },
    cartData: {
      type: Object,
      default: {},
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    minimize: false,
    timeStamp: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.log("err at modifing the password in user-models", error);
    // next(error);
  }
});

// note :-writing async function is important and  arrow function will not work.
//note :- these will run on query return from model
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        name: this.name,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SIGN_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (e) {
    console.error("Err at generateToken in userModels", e);
  }
};

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(`Error in compare bcryptjs password in usermodel ${error}`);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
