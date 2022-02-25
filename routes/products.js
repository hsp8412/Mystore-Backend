const { Product, validateProduct } = require("../models/products");
const { Category, validateCategory } = require("../models/categories");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort({ name: 1 });
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  let product = new Product({
    name: req.body.name,
    category: {
      _id: req.body.categoryId,
      name: category.name,
    },
    price: req.body.price,
    stock: req.body.stock,
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

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const update = {
    name: req.body.name,
    category: {
      _id: req.body.categoryId,
      name: category.name,
    },
    price: req.body.price,
    stock: req.body.stock,
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
