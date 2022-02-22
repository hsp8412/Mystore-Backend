const { Product, validateProduct } = require("../models/products");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const products = await Product.find().sort({ name: 1 });
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    date: req.body.date,
    isAvailable: req.body.isAvailable,
  });

  product = await product.save();
  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given id is not found!");

  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const update = {
    name: req.body.name,
    price: req.body.price,
    date: req.body.date,
    isAvailable: req.body.isAvailable,
  };

  const product = await Product.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  if (!product)
    return res.status(404).send("The product with the given id is not found!");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given id is not found");

  res.send(product);
});

module.exports = router;
