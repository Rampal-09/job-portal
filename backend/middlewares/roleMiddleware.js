const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (req.session.user && roles.includes(req.session.user.role)) {
      console.log(req.session.user.role);
      next();
    } else {
      return res.status(403).json({ message: " Access denied." });
    }
  };
};

module.exports = roleMiddleware;
