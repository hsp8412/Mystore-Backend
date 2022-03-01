const { Category, validateCategory } = require("../models/category");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.send(categories);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res.status(404).send("The category with given id is not found.");

  res.send(category);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const update = {
    name: req.body.name,
  };

  const category = await Category.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  if (!category)
    return res.status(404).send("The category with the given id is not found.");
  res.send(category);
});

router.delete("/:id", auth, admin, async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category)
    return res.status(404).send("The category with the given id is not found");

  res.send(category);
});

module.exports = router;
