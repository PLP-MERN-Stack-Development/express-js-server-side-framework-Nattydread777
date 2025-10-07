// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err); // server log
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  // in dev you might return stack: err.stack
  res.status(status).json({ error: message });
};


//Purpose: centralizes error responses.