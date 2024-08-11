const express = require("express");
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { dashboard } = require("../controllers/userController");

const router = express.Router();

router.get("/dashboard", protect, dashboard);

router.get("/admin-dashboard", protect, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

router.get(
  "/manager-dashboard",
  protect,
  authorizeRoles("Manager"),
  (req, res) => {
    res.json({ message: "Welcome to the Manager Dashboard" });
  }
);

router.get("/user-dashboard", protect, authorizeRoles("User"), (req, res) => {
  res.json({ message: "Welcome to the User Dashboard" });
});

module.exports = router;
