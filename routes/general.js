const express = require("express");
const router = express.Router();
const config = require("../config/db");
const Factory = require("../models/Factory");

// add factory
router.post("/add/factory", (req, res, next) => {
  newFactory = new Factory({
    factory_name: req.body.factory_name,
    status: req.body.status
  });
  Factory.addFactory(newFactory, (err, factory) => {
    if (err) {
      res.json({ success: false, msg: "Failed to add the Order" });
    } else {
      res.json({
        success: true,
        msg: "Factory added successfully",
        factory: factory
      });
    }
  });
});
// Fethc all the factories
router.get("/get/factories", (req, res, next) => {
  Factory.find()
    .sort({ date: "desc" })
    .then(factories => {
      res.json({ factories: factories });
    });
});

module.exports = router;
