const express = require("express");
const router = express.Router();
const Style = require("../models/Style");
const config = require("../config/db");

// Add Style route
router.post("/add", (req, res, next) => {
  let newStyle = new Style({
    style_name: req.body.style_name,
    brand_name: req.body.brand_name,
    factory: req.body.factory
  });
  Style.addStyle(newStyle, (err, style) => {
    if (err) {
      console.log(err);
      res.json({ success: false, msg: "Failed to add the Style" });
    } else {
      res.json({
        success: true,
        msg: "Style added successfully",
        style: style
      });
    }
  });
});

// to get the style on the basis of factory
router.get("/get/:factory", (req, res, next) => {
  Style.find({ factory: req.params.factory })
    .sort({ date: "desc" })
    .then(styles => {
      res.json(styles);
    });
});

// Delete the styles
router.get("/delete/:id", (req, res) => {
  Style.remove({ _id: req.params.id }).then(() => {
    res.json({ success: true, msg: "The Style has been removed successfully" });
  });
});

module.exports = router;
