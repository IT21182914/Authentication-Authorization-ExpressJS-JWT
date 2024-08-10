exports.dashboard = (req, res) => {
  const { role } = req.user;

  if (role === "Admin") {
    res.json({ message: "Admin Dashboard" });
  } else if (role === "Manager") {
    res.json({ message: "Manager Dashboard" });
  } else if (role === "User") {
    res.json({ message: "User Dashboard" });
  } else {
    res.status(403).json({ message: "Access Denied" });
  }
};
