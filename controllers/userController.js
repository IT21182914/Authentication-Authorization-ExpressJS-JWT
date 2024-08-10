exports.dashboard = (req, res) => {
  const { role } = req.user;

  switch (role) {
    case "Admin":
      return res.json({ message: "Welcome to the Admin Dashboard" });
    case "Manager":
      return res.json({ message: "Welcome to the Manager Dashboard" });
    case "User":
      return res.json({ message: "Welcome to the User Dashboard" });
    default:
      return res.status(403).json({ message: "Access Denied" });
  }
};
