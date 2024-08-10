const express = require("express");
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const { dashboard } = require("../controllers/userController");

const router = express.Router();

// Universal dashboard route
router.get("/dashboard", protect, dashboard);

// Admin dashboard route
router.get("/admin-dashboard", protect, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

// Manager dashboard route
router.get(
  "/manager-dashboard",
  protect,
  authorizeRoles("Manager"),
  (req, res) => {
    res.json({ message: "Welcome to the Manager Dashboard" });
  }
);

// User dashboard route
router.get("/user-dashboard", protect, authorizeRoles("User"), (req, res) => {
  res.json({ message: "Welcome to the User Dashboard" });
});

module.exports = router;
