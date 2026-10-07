require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('=========================================');
  console.log('🚀 Custom Express Products API is running!');
  console.log(`📡 Local URL:   http://localhost:${PORT}`);
  console.log(`📦 Healthcheck: http://localhost:${PORT}/health`);
  console.log(`🛒 Products:    http://localhost:${PORT}/api/products`);
  console.log(`📊 Statistics:  http://localhost:${PORT}/api/products/stats`);
  console.log('=========================================');
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server...');
  server.close(() => {
    console.log('HTTP server closed.');
  });
});
