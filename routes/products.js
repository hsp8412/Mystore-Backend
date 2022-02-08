const express = require("express");
const router = express.Router();
const Joi = require("joi");

const products = [
  { id: 1, name: "Macbook Air", price: 1000 },
  { id: 2, name: "Lamp", price: 20 },
  { id: 3, name: "Mouse", price: 60 },
];

router.get("/", (req, res) => {
  res.send(products);
});

router.post("/", (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(product);
  res.send(product);
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).send("The product with the given id is not found!");
  res.send(product);
});

router.put("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).send("The product with the given id is not found!");

  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  product.name = req.body.name;
  product.price = req.body.price;
  res.send(product);
});

router.delete("/:id", (req, res) => {
  const product = products.find((p) => p.id == parseInt(req.params.id));
  if (!product)
    return res.status(404).send("The product with the given id is not found");

  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send(product);
});

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(10).max(9999999).required(),
  });

  return schema.validate(product);
}

module.exports = router;
