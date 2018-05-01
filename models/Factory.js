const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/db");

// style Schema
const FactorySchema = mongoose.Schema({
  factory_name: {
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

const Factory = (module.exports = mongoose.model("Factory", FactorySchema));

module.exports.getFactoryById = function(id, callback) {
  Factory.findById(id, callback);
};

module.exports.getOFactoryByName = function(factory_name, callback) {
  const query = { factory_name: factory_name };
  Factory.findOne(query, callback);
};

module.exports.addFactory = function(newOrder, callback) {
  newFactory.save(callback);
};
