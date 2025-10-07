// routes/productRoutes.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

const router = express.Router();

// In-memory products store (assignment requires UUIDs)
let products = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop with 16GB RAM', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'Smartphone', description: 'Latest model with 128GB storage', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Programmable coffee maker with timer', price: 50, category: 'kitchen', inStock: false }
];

/**
 * GET /api/products
 * - Supports optional query params:
 *    - category (filter)
 *    - q (search in name)
 *    - page (pagination, default 1)
 *    - limit (items per page, default 10)
 */
router.get('/', (req, res) => {
  let { category, q, page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;

  let results = products.slice();

  if (category) {
    results = results.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
  }

  if (q) {
    const term = String(q).toLowerCase();
    results = results.filter(p => p.name.toLowerCase().includes(term));
  }

  const total = results.length;
  const start = (page - 1) * limit;
  const data = results.slice(start, start + limit);

  res.json({
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  });
});

/**
 * GET /api/products/search?q=<term>
 * - Alternative search endpoint (assignment asked for search endpoint)
 */
router.get('/search', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const results = products.filter(p => p.name.toLowerCase().includes(q));
  res.json({ total: results.length, results });
});

/**
 * GET /api/products/stats
 * - Returns count by category and total
 */
router.get('/stats', (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc.total = (acc.total || 0) + 1;
    acc.byCategory = acc.byCategory || {};
    acc.byCategory[p.category] = (acc.byCategory[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json({ total: stats.total || 0, byCategory: stats.byCategory || {} });
});

/**
 * GET /api/products/:id
 * - Return single product by id
 * NOTE: keep parameter route **after** static /search and /stats
 */
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

/**
 * POST /api/products
 * - Protected endpoint (require API key)
 * - Validate request body with validateProduct middleware
 */
router.post('/', auth, validateProduct, (req, res) => {
  const { name, description, price, category, inStock = true } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct); // 201 Created
});

/**
 * PUT /api/products/:id
 * - Protected, validate body
 */
router.put('/:id', auth, validateProduct, (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });

  const { name, description, price, category, inStock } = req.body;
  // Only overwrite the allowed fields
  products[idx] = {
    ...products[idx],
    name,
    description,
    price,
    category,
    inStock
  };

  res.json(products[idx]);
});

/**
 * DELETE /api/products/:id
 * - Protected
 */
router.delete('/:id', auth, (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Product not found' });
  const removed = products.splice(idx, 1)[0];
  res.json({ message: 'Product deleted', product: removed });
});

module.exports = router;
//Purpose: handles all /api/products routes.