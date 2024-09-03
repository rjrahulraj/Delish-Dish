const express = require("express");
const router = express.Router();

const {
  placeOrder,
  verifyOrder,
  userOrders,
  adminorders,
  updateStatus,
} = require("../controllers/orderController");
const authenication = require("../middlewares/authentication");

router.route("/placeorder").post(authenication, placeOrder);
router.route("/verify").post(verifyOrder);
router.route("/fetchorders").get(authenication, userOrders);
router.route("/allorders").get(adminorders);
router.route("/updatestatus").patch(updateStatus);

module.exports = router;
