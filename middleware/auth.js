// middleware/auth.js
module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key') || req.header('api-key');
  const expected = process.env.API_KEY || 'test-key';
  if (!apiKey || apiKey !== expected) {
    return res.status(401).json({ error: 'Unauthorized: missing or invalid API key' });
  }
  next();
};
//Purpose: protects POST/PUT/DELETE routes. Use header x-api-key: test-key