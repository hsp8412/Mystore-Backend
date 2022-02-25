const { Category, validateCategory } = require("../models/category");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({
    name: req.body.name,
  });
  product = await category.save();
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res.status(404).send("The category with given id is not found.");

  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const update = new Category({
    name: req.body.name,
  });

  const category = await Category.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  if (!category)
    return res.status(404).send("The category with the given id is not found.");
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = Category.findByIdAndDelete(req.params.id);

  if (!category)
    return res.status(404).send("The category with the given id is not found");

  res.send(category);
});

module.exports = router;
