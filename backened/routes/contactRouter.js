const express = require("express");
const router = express.Router();
const authenication = require("../middlewares/authentication");

const {
  addContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

router.post("/add", authenication, addContact);
router.get("/fetch", getContacts);
router.delete("/remove/:id", deleteContact);

module.exports = router;
