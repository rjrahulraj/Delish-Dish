const express = require("express");
const router = express.Router();
const authenication = require("../middlewares/authentication");
const {
  addItem,
  removefromCart,
  getCart,
} = require("../controllers/cartControllers");

router.route("/add").patch(authenication, addItem);
router.route("/remove").patch(authenication, removefromCart);
router.route("/getcart").get(authenication, getCart);

module.exports = router;
