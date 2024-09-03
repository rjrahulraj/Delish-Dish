require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.SERVER_PORT;
const colors = require("colors");
const connect_DB = require("./config/db");
const foodRouter = require("./routes/foodRouter");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const contactRouter = require("./routes/contactRouter");
let cors = require("cors");

//middlewsres
app.use(express.json());
app.use(cors()); //cors handle

//api endpoints
app.use("/images", express.static("uploads"));
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "api working" });
});

connect_DB().then(
  () => {
    app.listen(port, () => {
      console.log(`Server start at port :: ${port}`.rainbow);
    });
    console.log(`DB connected successfully`.rainbow);
  },
  (err) => {
    console.log(`Error at connection with DB ${err}`.red);
  }
);
