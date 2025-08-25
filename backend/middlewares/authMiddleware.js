const authMiddleware = (req, res, next) => {
  if (req.session.user && req.session.user.id) {
    next();
  } else {
    return res.status(401).json({ message: "Please login first" });
  }
};

module.exports = authMiddleware;
