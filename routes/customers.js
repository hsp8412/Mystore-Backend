const { Customer, validateCustomer } = require("../models/customer");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ registerDate: 1 });
  res.send(customers);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    membership: req.body.membership,
  });
  product = await customer.save();
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(404).send("The customer with given id is not found.");

  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const update = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    membership: req.body.membership,
  };

  const customer = await Customer.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  if (!customer)
    return res.status(404).send("The customer with the given id is not found.");
  res.send(customer);
});

router.delete("/:id", auth, admin, async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res.status(404).send("The customer with the given id is not found");

  res.send(customer);
});

module.exports = router;
