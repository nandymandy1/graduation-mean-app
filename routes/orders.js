const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Order_b = require("../models/Orderb");
const config = require("../config/db");

// Add new Order
router.post("/add", (req, res, next) => {
  let newOrder = new Order({
    order_name: req.body.order_name,
    quantity: req.body.quantity,
    style_id: req.body.style_id,
    delivery_date: req.body.delivery_date,
    status: 0,
    produced: 0,
    factory: req.body.factory
  });
  Order.addOrder(newOrder, (err, order) => {
    if (err) {
      res.json({ success: false, msg: "Failed to add the Order" });
    } else {
      res.json({
        success: true,
        msg: "Order added successfully",
        order: order
      });
    }
  });
});

router.get("/get", (req, res, next) => {
  Order.find()
    .sort({ date: "desc" })
    .then(orders => {
      res.json({ orders: orders });
    });
});

router.get("/get/:factory", (req, res, next) => {
  Order.find({ factory: req.params.factory })
    .sort({ date: "desc" })
    .then(orders => {
      res.json({ orders: orders });
    });
});

// Delete the Orders
router.get("/delete/:id", (req, res, next) => {
  Order.remove({ _id: req.params.id }).then(() => {
    res.json({ success: true, msg: "The Order has been removed successfully" });
  });
});

// Order BreakUp
router.post("/breakup/add", (req, res, next) => {
  Order.findOne({ _id: req.body.order_id }).then(ordr => {
    newOrderB = new Order_b({
      order_name: ordr.order_name,
      quantity: req.body.quantity,
      loading_date: req.body.loading_date,
      progress: 0,
      status: "Not-Loaded",
      factory: req.body.factory
    });
    Order_b.addOrder_b(newOrderB, (err, order_b) => {
      if (err) {
        res.json({
          success: false,
          msg: "Failed to add the Order",
          erorr: err
        });
      } else {
        res.json({
          success: true,
          msg: "Order Breakup added successfully",
          order_b: order_b
        });
      }
    });
  });
});

// Get all the factory's Breakups
router.get("/breakup/get/:factory", (req, res, next) => {
  Order_b.find({ factory: req.params.factory })
    .sort({ date: "desc" })
    .then(order_b => {
      res.json(order_b);
    });
});

// Delete Breakups
router.get("/breakup/delete/:id", (req, res, next) => {
  Order_b.remove({ _id: req.params.id }).then(() => {
    res.json({
      success: true,
      msg: "The Order Breakup has been removed successfully"
    });
  });
});
// Fetch Toadys Order Breakups
router.get("/breakup/get/today/:factory", (req, res, next) => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  if (month < 10) {
    newdate = year + "-0" + month;
  } else {
    newdate = year + "-" + month;
  }
  if (day < 10) {
    newdate = newdate + "-0" + day + "T00:00:00.000Z";
  } else {
    newdate = newdate + "-" + day + "T00:00:00.000Z";
  }
  Order_b.find({
    loading_date: { $gte: new Date(newdate) },
    factory: req.params.factory,
    status: "Not-Loaded"
  })
    .sort({ quantity: "desc" })
    .then(order_b => {
      res.json(order_b);
    });
});

// Get all todays completed Orders
router.get("/breakup/get/completed/today/:factory", (req, res, next) => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  if (month < 10) {
    newdate = year + "-0" + month;
  } else {
    newdate = year + "-" + month;
  }
  if (day < 10) {
    newdate = newdate + "-0" + day + "T00:00:00.000Z";
  } else {
    newdate = newdate + "-" + day + "T00:00:00.000Z";
  }
  Order_b.find({
    loading_date: { $gte: new Date(newdate) },
    factory: req.params.factory,
    status: "Cutting Completed"
  })
    .sort({ quantity: "desc" })
    .then(order_b => {
      res.json(order_b);
    });
});

// Set Today's completed Orders
router.get("/breakup/get/completed/:id", (req, res, next) => {
  Order_b.findOne({ _id: req.params.id }).then(order_b => {
    order_b.status = "Cutting Completed";
    order_b.progress = order_b.quantity;
    order_b.save().then(order_b => {
      res.json({ order_b: order_b });
    });
  });
});
// Sent it to supermarket
router.get("/breakup/send/supermarket/:id", (req, res, next) => {
  Order_b.findOne({ _id: req.params.id }).then(order_b => {
    order_b.status = "Super Market";
    order_b.save().then(order_b => {
      res.json({ msg: "Order Breakup Sent to Supermarket" });
    });
  });
});

//getting the orders from the supermarket
router.get("/get/supermarket/:factory", (req, res, next) => {
  Order_b.find({ factory: req.params.factory, status: "Super Market" })
    .sort({ quantity: "desc" })
    .then(order_b => {
      res.json({ order_b: order_b });
    });
});

// Issueing ordder for the sewing department
router.get("/issue/sewing/:id/:qty", (req, res, next) => {
  Order_b.findOne({ _id: req.params.id, status: "Super Market" }).then(
    order_b => {
      order_b.status = "Sewing";
      order_b.save().then(order_b => {
        res.json({ success: true, msg: "Order Issused for Sewing" });
      });
    }
  );
});

module.exports = router;
