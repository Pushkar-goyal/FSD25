process.env.NODE_ENV = 'test';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

describe('Custom Express Products API Test Suite', () => {
  test('GET / - API Meta Root', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.name, 'Custom Express Products REST API');
    assert.ok(body.endpoints);
  });

  test('GET /health - Healthcheck', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, 'ok');
    assert.ok(body.uptime);
  });

  test('GET /public/index.html - Serves static HTML frontend asset', async () => {
    const res = await fetch(`${baseUrl}/public/index.html`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('<title>Custom Product Store</title>'));
  });

  test('GET /api/products - Returns 100 products total with default pagination (limit 10)', async () => {
    const res = await fetch(`${baseUrl}/api/products`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.total, 100);
    assert.strictEqual(body.count, 10);
    assert.strictEqual(body.page, 1);
    assert.strictEqual(body.totalPages, 10);
    assert.strictEqual(body.data.length, 10);
  });

  test('GET /api/products?all=true - Returns all 100 products', async () => {
    const res = await fetch(`${baseUrl}/api/products?all=true`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.total, 100);
    assert.strictEqual(body.data.length, 100);
  });

  test('GET /api/products/categories - Distinct categories', async () => {
    const res = await fetch(`${baseUrl}/api/products/categories`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.count, 10);
    assert.ok(Array.isArray(body.data));
  });

  test('GET /api/products/stats - Aggregated product statistics', async () => {
    const res = await fetch(`${baseUrl}/api/products/stats`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.data.totalProducts, 100);
    assert.ok(body.data.averagePrice > 0);
    assert.ok(body.data.totalStock > 0);
    assert.strictEqual(body.data.categoriesCount, 10);
  });

  test('GET /api/products/1 - Single product by ID', async () => {
    const res = await fetch(`${baseUrl}/api/products/1`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.data.id, 1);
    assert.ok(body.data.title);
  });

  test('POST /api/products - Create product successfully', async () => {
    const payload = {
      title: 'Ultra High Tech Drone Pro',
      description: 'Advanced flight stabilization with 8K camera.',
      category: 'Electronics',
      price: 999.99,
      stock: 25,
      brand: 'AeroFly',
      tags: ['drone', 'camera', '8k']
    };

    const res = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.data.id, 101);
    assert.strictEqual(body.data.title, payload.title);
    assert.strictEqual(body.data.price, 999.99);
  });

  test('POST /api/products - Validation error on missing required fields', async () => {
    const res = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '' })
    });

    assert.strictEqual(res.status, 400);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.ok(body.errors.length >= 2);
  });
});
