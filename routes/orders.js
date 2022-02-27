const { Order, validateOrder } = require("../models/order");
const { Product, validateProduct } = require("../models/product");
const { Customer, validateCustomer } = require("../models/customer");
const { calculateTotal } = require("../utils/calculateTotal");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ total: 1 });
  res.send(orders);
});

router.post("/", async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const productsInfo = req.body.products;

  let orderProducts = [];

  for (let productInfo of productsInfo) {
    const product = await Product.findById(productInfo.productId);
    if (!product) return res.status(400).send("Invalid product.");
    const orderProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      numberToPurchase: productInfo.numberToPurchase,
    };
    orderProducts.push(orderProduct);
  }

  let order = new Order({
    customer: {
      _id: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      membership: customer.membership,
    },
    products: orderProducts,
    total: calculateTotal(orderProducts),
  });

  order = await order.save();
  res.send(order);
});

module.exports = router;
