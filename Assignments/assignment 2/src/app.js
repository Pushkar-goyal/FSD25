const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const productsRoutes = require('./routes/productsRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Core middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging (disabled in test environment)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

const path = require('path');
const fs = require('fs');

// Serve static public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Preview dashboard endpoint
app.get('/preview', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'preview.html'));
});

// Direct zip download endpoint
app.get('/download', (req, res) => {
  const possiblePaths = [
    path.join(__dirname, '..', '..', 'express-products-api.zip'),
    path.join(__dirname, '..', 'express-products-api.zip'),
    path.join('C:', 'Users', 'Pushkar Goel', 'Downloads', 'express-products-api.zip')
  ];
  const zipPath = possiblePaths.find(p => fs.existsSync(p));
  if (zipPath) {
    return res.download(zipPath, 'express-products-api.zip');
  }
  return res.status(404).json({ success: false, message: 'Zip archive not found' });
});

// Root endpoint: API meta and quick links
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Express Products REST API',
    version: '1.0.0',
    description: 'REST API featuring 100 realistic e-commerce products with CRUD, pagination, filtering, search, and sorting.',
    preview: 'http://localhost:5000/preview',
    download: 'http://localhost:5000/download',
    endpoints: {
      previewUI: 'GET /preview',
      downloadZip: 'GET /download',
      health: 'GET /health',
      products: 'GET /api/products',
      productsSearch: 'GET /api/products?q={query}&category={category}&minPrice={min}&maxPrice={max}&page={page}&limit={limit}',
      categories: 'GET /api/products/categories',
      statistics: 'GET /api/products/stats',
      productById: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      patchProduct: 'PATCH /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id',
      resetData: 'POST /api/products/reset'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: `${process.uptime().toFixed(1)}s`,
    timestamp: new Date().toISOString()
  });
});

// Mount routes
app.use('/api/products', productsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
