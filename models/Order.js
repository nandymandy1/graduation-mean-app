const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/db");

// style Schema
const OrderSchema = mongoose.Schema({
  order_name: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  style_id: {
    type: String,
    required: true
  },
  delivery_date: {
    type: Date,
    required: true
  },
  produced: {
    type: Number,
    required: true
  },
  factory: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Order = (module.exports = mongoose.model("Order", OrderSchema));

module.exports.getOrderById = function(id, callback) {
  Order.findById(id, callback);
};

module.exports.getOrderByName = function(order_name, callback) {
  const query = { order_name: order_name };
  Order.findOne(query, callback);
};

module.exports.addOrder = function(newOrder, callback) {
  newOrder.save(callback);
};
