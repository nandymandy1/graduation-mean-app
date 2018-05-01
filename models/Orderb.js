const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/db");

// style Schema
const Order_bSchema = mongoose.Schema({
  order_name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  loading_date: {
    type: Date,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
  factory: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Order_b = (module.exports = mongoose.model("Order_b", Order_bSchema));

module.exports.getOder_bById = function(id, callback) {
  Order_b.findById(id, callback);
};

module.exports.getOrder_bByName = function(order_b, callback) {
  const query = { order_b: order_b };
  Order_b.findOne(query, callback);
};

module.exports.addOrder_b = function(newOrder_b, callback) {
  newOrder_b.save(callback);
};
