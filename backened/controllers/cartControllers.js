const User = require("../models/userModels");

// Logic for adding an item to the cart
exports.addItem = async (req, res) => {
  try {
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "Select food !!!",
      });
    }

    let user = await User.findOne({ _id: req.userDetails.userId });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found !!! login again",
      });
    }

    let cartData = user.cartData;

    if (!cartData[foodId]) {
      cartData[foodId] = 1;
    } else {
      cartData[foodId] += 1;
    }

    let updatedCart = await User.findOneAndUpdate(
      { _id: req.userDetails.userId },
      { cartData }
    );
    //     console.log(updatedCart);
    res.status(200).json({
      success: true,
      message: "Food Item Added",
    });
  } catch (error) {
    console.log(`Error in addCart :: ${error}`);
    res.status(400).json({ success: true, message: error.message });
  }
};

// Logic for removing an item from the cart
exports.removefromCart = async (req, res) => {
  try {
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "Select food !!!",
      });
    }

    let user = await User.findOne({ _id: req.userDetails.userId });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found !!! login again",
      });
    }

    let cartData = user.cartData;

    if (cartData[foodId] > 0) {
      cartData[foodId]--;
    }
    let updatedCart = await User.findOneAndUpdate(
      { _id: req.userDetails.userId },
      { cartData }
    );

    res.status(200).json({
      success: true,
      message: "Food Item Removed",
    });
  } catch (error) {
    console.log(`Error in remove foodItem:: ${error}`);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Logic for getting the cart
exports.getCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.userDetails.userId });
    let cartData = user.cartData;
    // console.log(cartData);
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(`Error in addCart :: ${error}`);
    res.status(400).json({ success: false, message: error.message });
  }
};
