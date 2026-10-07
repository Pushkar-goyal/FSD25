const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const productsRoutes = require('./routes/productsRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.get('/favicon.ico', (req, res) => {
  res.redirect('/public/favicon.svg');
});

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Custom Express Products REST API',
    version: '1.0.0',
    description: 'A REST API featuring 100 products with CRUD, filters, and pagination.',
    endpoints: {
      health: 'GET /health',
      products: 'GET /api/products',
      categories: 'GET /api/products/categories',
      stats: 'GET /api/products/stats',
      productById: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      patchProduct: 'PATCH /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id'
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: `${process.uptime().toFixed(1)}s`,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/products', productsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
