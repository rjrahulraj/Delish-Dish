const Order = require("../models/orderModels");
const User = require("../models/userModels");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTENED_URL = process.env.FRONTENED_URL;

const placeOrder = async (req, res) => {
  const { items, amount, address } = req.body;

  if (!items || !amount || !address) {
    return res.status(400).json({
      success: true,
      messages: "Fill all the credentails",
    });
  }
  try {
    let newOrder = new Order({
      userId: req.userDetails.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await User.findByIdAndUpdate(req.userDetails.userId, { cartData: {} });

    let line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${FRONTENED_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${FRONTENED_URL}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Payment Successful" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res
        .status(200)
        .json({ success: true, message: "Payment Denied and order Deleted" });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const userOrders = async (req, res) => {
  let userId = req.userDetails.userId;
  try {
    const orders = await Order.find({ userId });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// admin orders
const adminorders = async (req, res) => {
  try {
    let orders = await Order.find({});
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// update  status by admin
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;

  // Check for missing parameters
  if (!orderId || !status) {
    return res.status(400).json({
      success: false,
      message: "Provide orderId and Status",
    });
  }

  try {
    // Perform the update operation
    let update = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    // Send success response
    return res.status(200).json({
      success: true,
      message: "status update successfully",
      data: update,
    });
  } catch (error) {
    // Handle errors
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  verifyOrder,
  userOrders,
  adminorders,
  updateStatus,
};
