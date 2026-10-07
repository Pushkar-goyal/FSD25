process.env.NODE_ENV = 'test';

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    // Listen on random free port
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

describe('Express Products API Test Suite', () => {

  test('GET / - API Meta Root', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.name, 'Express Products REST API');
    assert.ok(body.endpoints);
  });

  test('GET /health - Healthcheck', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, 'ok');
    assert.ok(body.uptime);
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

  test('GET /api/products?page=2&limit=5 - Pagination behavior', async () => {
    const res = await fetch(`${baseUrl}/api/products?page=2&limit=5`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.page, 2);
    assert.strictEqual(body.limit, 5);
    assert.strictEqual(body.count, 5);
    assert.strictEqual(body.data[0].id, 6);
  });

  test('GET /api/products?all=true - Returns all 100 products', async () => {
    const res = await fetch(`${baseUrl}/api/products?all=true`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.total, 100);
    assert.strictEqual(body.data.length, 100);
  });

  test('GET /api/products?category=Electronics - Filters by category', async () => {
    const res = await fetch(`${baseUrl}/api/products?category=Electronics&all=true`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.total, 10);
    body.data.forEach((item) => {
      assert.strictEqual(item.category, 'Electronics');
    });
  });

  test('GET /api/products?q=headphones - Text search', async () => {
    const res = await fetch(`${baseUrl}/api/products?q=headphones`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(body.total >= 1);
    const first = body.data[0];
    const match =
      first.title.toLowerCase().includes('headphones') ||
      first.description.toLowerCase().includes('headphones');
    assert.ok(match);
  });

  test('GET /api/products?sortBy=price&order=desc - Sorting', async () => {
    const res = await fetch(`${baseUrl}/api/products?sortBy=price&order=desc&limit=10`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    for (let i = 0; i < body.data.length - 1; i++) {
      assert.ok(body.data[i].price >= body.data[i + 1].price);
    }
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

  test('GET /api/products/9999 - Non-existent ID returns 404', async () => {
    const res = await fetch(`${baseUrl}/api/products/9999`);
    assert.strictEqual(res.status, 404);
    const body = await res.json();
    assert.strictEqual(body.success, false);
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
      body: JSON.stringify({ title: '' }) // missing price and category
    });

    assert.strictEqual(res.status, 400);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.ok(body.errors.length >= 2);
  });

  test('PUT /api/products/101 - Full update of existing product', async () => {
    const updatePayload = {
      title: 'Ultra High Tech Drone Pro MAX',
      description: 'Updated with extended battery life and 8K camera.',
      category: 'Electronics',
      price: 1099.99,
      stock: 30,
      brand: 'AeroFly'
    };

    const res = await fetch(`${baseUrl}/api/products/101`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.data.title, 'Ultra High Tech Drone Pro MAX');
    assert.strictEqual(body.data.price, 1099.99);
    assert.ok(body.data.updatedAt);
  });

  test('PATCH /api/products/101 - Partial update of product', async () => {
    const patchPayload = {
      price: 899.99,
      stock: 15
    };

    const res = await fetch(`${baseUrl}/api/products/101`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchPayload)
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.data.price, 899.99);
    assert.strictEqual(body.data.stock, 15);
  });

  test('DELETE /api/products/101 - Remove product', async () => {
    const res = await fetch(`${baseUrl}/api/products/101`, {
      method: 'DELETE'
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.data.id, 101);

    // Verify it is gone
    const verifyRes = await fetch(`${baseUrl}/api/products/101`);
    assert.strictEqual(verifyRes.status, 404);
  });

  test('POST /api/products/reset - Restore dataset back to 100 products', async () => {
    const res = await fetch(`${baseUrl}/api/products/reset`, { method: 'POST' });
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.total, 100);
  });

  test('GET /unknown-route - 404 handler', async () => {
    const res = await fetch(`${baseUrl}/unknown-route`);
    assert.strictEqual(res.status, 404);
    const body = await res.json();
    assert.strictEqual(body.success, false);
  });

});
