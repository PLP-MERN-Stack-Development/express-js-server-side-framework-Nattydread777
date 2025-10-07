// middleware/validateProduct.js
module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name is required and must be a non-empty string' });
  }
  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'description must be a string' });
  }
  if (price === undefined || typeof price !== 'number' || Number.isNaN(price)) {
    return res.status(400).json({ error: 'price is required and must be a number' });
  }
  if (!category || typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({ error: 'category is required and must be a non-empty string' });
  }
  if (inStock !== undefined && typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'inStock must be a boolean if provided' });
  }

  // Normalize/trim
  req.body.name = name.trim();
  req.body.category = category.trim();

  next();
};
//Purpose: validates product data in POST/PUT requests.