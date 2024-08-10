const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.create({ username, password, role });
    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(400).json({ message: "Error creating user", error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      // Set the token in the response header
      res.setHeader("Authorization", `Bearer ${token}`);

      // Determine the redirect URL based on the user's role
      let dashboardURL;
      switch (user.role) {
        case "Admin":
          dashboardURL = "/api/users/admin-dashboard";
          break;
        case "Manager":
          dashboardURL = "/api/users/manager-dashboard";
          break;
        case "User":
          dashboardURL = "/api/users/user-dashboard";
          break;
        default:
          dashboardURL = "/api/users/dashboard";
      }

      // Send the appropriate dashboard URL and token in the response
      res.json({
        token: `Bearer ${token}`,
        redirectURL: dashboardURL,
        user: {
          _id: user._id,
          username: user.username,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
};
