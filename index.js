const debug = require("debug")("app:startup");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const products = require("./routes/products");
const home = require("./routes/home");
const categories = require("./routes/categories");
const customers = require("./routes/customers");
const orders = require("./routes/orders");

mongoose
  .connect("mongodb://localhost/products")
  .then(() => console.log("Connected to the database..."))
  .catch((err) => console.error("Failed to connect to the database", err));

app.use(express.json());
app.use("/api/products", products);
app.use("/", home);
app.use("/api/categories", categories);
app.use("/api/customers", customers);
app.use("/api/orders", orders);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
