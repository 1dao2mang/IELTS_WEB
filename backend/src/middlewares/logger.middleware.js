// Logger Middleware - Request logging
const loggerMiddleware = (req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { loggerMiddleware };
