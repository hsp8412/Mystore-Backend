const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 3,
  },
  category: {
    type: categorySchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 99999999,
  },
  stock: {
    type: Number,
    required: true,
    min: 1,
    max: 255,
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
    name: Joi.string().min(3).max(50).required(),
    categoryId: Joi.required(),
    price: Joi.number().min(1).max(99999999).required(),
    stock: Joi.number().min(1).max(255).required(),
    date: Joi.date(),
    isAvailable: Joi.boolean(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
