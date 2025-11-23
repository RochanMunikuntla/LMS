export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    if (req.session.user.role !== role) {
      return res.status(403).json({ message: "Forbidden. Access denied." });
    }
    console.log("role passed");
    next();
  };
};
