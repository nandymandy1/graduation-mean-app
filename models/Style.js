const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/db");

// style Schema
const StyleSchema = mongoose.Schema({
  style_name: {
    type: String
  },
  brand_name: {
    type: String,
    required: true
  },
  factory: {
    type: String,
    required: true
  }
});

const Style = (module.exports = mongoose.model("Style", StyleSchema));

module.exports.getStyleById = function(id, callback) {
  Style.findById(id, callback);
};

module.exports.getStyleByName = function(style_name, callback) {
  const query = { style_name: style_name };
  Style.findOne(query, callback);
};

module.exports.addStyle = function(newStyle, callback) {
  newStyle.save(callback);
};
