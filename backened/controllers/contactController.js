const Contact = require("../models/contactModels");

// add new contact
const addContact = async (req, res) => {
  const { name, email, message, subject } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !message || !subject) {
    return res
      .status(400)
      .json({ success: false, message: "Fill all credentials" });
  }

  try {
    // Create a new contact document
    const newContact = new Contact({ name, email, subject, message });

    // Save the contact to the database
    await newContact.save();

    // Send a success response
    return res
      .status(200)
      .json({ success: true, message: "Your message is send" });
  } catch (error) {
    console.error(`Error in adding the contact: ${error.message}`);

    // Send an error response
    return res
      .status(500)
      .json({ success: false, message: "Error! Please try again later." });
  }
};

// get all contact details
const getContacts = async (req, res) => {
  try {
    let allContacts = await Contact.find({});
    return res.status(200).json({ success: true, data: allContacts });
  } catch (error) {
    console.log(`Error in fetching the contact :: ${error}`);
    res
      .status(400)
      .json({ success: false, message: "Error !!! Try after sometimes" });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    let response = await Contact.deleteOne({ _id: id });
    if (response.acknowledged === true) {
      return res
        .status(200)
        .json({ success: true, message: "Contact delete succesfully !!!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Error Try after some times !!!" });
    }
  } catch (error) {
    console.log(`Error in deleting the contact :: ${error}`);
    res
      .status(400)
      .json({ success: false, message: "Error !!! Try after sometimes" });
  }
  res.status(200).json({ id: id });
};

module.exports = { addContact, getContacts, deleteContact };
