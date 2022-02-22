const Joi = require("joi");
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 3,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(1).required(),
    date: Joi.date(),
    isAvailable: Joi.boolean(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
