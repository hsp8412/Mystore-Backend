const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      firstName: { type: String, required: true, minlength: 1, maxlength: 50 },
      lastName: { type: String, required: true, minlength: 1, maxlength: 50 },
      email: { type: String, required: true, minlength: 1, maxlength: 50 },
      membership: {
        type: String,
        enum: ["Gold", "Silver", "Regular"],
        default: "Regular",
      },
    }),
    required: true,
  },
  products: {
    type: [
      new mongoose.Schema({
        name: {
          type: String,
          required: true,
          maxlength: 50,
          minlength: 3,
        },
        price: {
          type: Number,
          required: true,
          min: 1,
          max: 99999999,
        },
        numberToPurchase: {
          type: Number,
          required: true,
          min: 1,
          max: 999,
        },
      }),
    ],
    required: true,
  },

  orderDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  total: {
    type: Number,
    required: true,
    min: 1,
    max: 99999999,
  },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    customerId: Joi.required(),
    products: Joi.array()
      .items({
        productId: Joi.string().required(),
        numberToPurchase: Joi.number().min(1).max(999).required(),
      })
      .required(),
  });
  return schema.validate(order);
}

exports.Order = Order;
exports.validateOrder = validateOrder;
