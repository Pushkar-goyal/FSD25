# 📘 College Assessment Report: Express.js Products REST API

**Course / Module**: CSE-25: Web Technologies & Backend Development  
**Project**: RESTful API Design & Implementation (100 Products Catalog)  
**Author**: Pushkar Goel  
**Technologies Used**: Node.js, Express.js, JavaScript (ES6+), JSON, REST Architecture  

---

## 1. Project Objective & Overview

The objective of this assignment is to design and develop a robust, modular, and scalable **RESTful API** using **Node.js** and **Express.js**. The application manages a rich dataset of **100 e-commerce products** categorized across 10 diverse domains (Electronics, Fashion, Home & Kitchen, Fitness, Beauty, Books, Toys, Gourmet Food, Office Supplies, and Automotive).

The API follows standard REST architectural principles, proper HTTP status codes, structured JSON responses, input validation, error handling, pagination, filtering, search, sorting, statistical aggregation, and includes an automated test suite.

---

## 2. Key Features Implemented

1. **Full RESTful CRUD Capabilities**:
   - `GET /api/products`: Retrieve all products with pagination, search, and filtering.
   - `GET /api/products/:id`: Fetch a single product by numeric identifier.
   - `POST /api/products`: Create a new product with input validation.
   - `PUT /api/products/:id`: Replace/fully update an existing product.
   - `PATCH /api/products/:id`: Partially update specific fields of a product.
   - `DELETE /api/products/:id`: Remove a product from inventory.

2. **Advanced Querying & Filtering**:
   - **Pagination**: `page` and `limit` with pagination metadata (`totalPages`, `hasNextPage`, `hasPrevPage`).
   - **Full-Text Search**: `q` searches across title, description, brand, category, and tags.
   - **Filtering**: By `category`, `brand`, `minPrice`, `maxPrice`, `minRating`, and `inStock`.
   - **Multi-attribute Sorting**: `sortBy` (price, rating, title, id) and `order` (`asc` / `desc`).

3. **Analytics & Aggregations**:
   - `GET /api/products/stats`: Aggregates total inventory, average price, price range, and category counts.
   - `GET /api/products/categories`: Lists all 10 distinct categories with item counts.

4. **Input Validation & Error Handling**:
   - Centralized 404 Route Not Found middleware.
   - Global 500 error handler.
   - Request body validation middleware for `POST` and `PUT` (verifying required fields and data types).

5. **Testing & Documentation**:
   - Built-in automated integration test suite with 19 passing test cases.
   - Interactive visual preview dashboard available at `http://localhost:5000/preview`.
   - Visual REST client file (`client.http`) for 1-click endpoint testing.

---

## 3. Directory Structure

```text
express-products-api/
├── src/
│   ├── data/
│   │   └── products.json          # 100 realistic product records
│   ├── controllers/
│   │   └── productsController.js  # Business logic, CRUD & query handlers
│   ├── middleware/
│   │   ├── errorHandler.js        # 404 & centralized error handling
│   │   └── validateProduct.js     # Request body validation
│   ├── routes/
│   │   └── productsRoutes.js      # REST API route mappings
│   ├── public/
│   │   └── preview.html           # Interactive visual preview & API explorer
│   ├── app.js                     # Express app setup, CORS, JSON parser & logger
│   └── server.js                  # Server bootstrap & port configuration
├── tests/
│   └── api.test.js                # 19 automated integration test cases
├── scripts/
│   └── seedProducts.js            # Reproducible product dataset generator
├── client.http                    # VS Code REST Client test requests
├── .env & .env.example            # Environment configurations (PORT=5000)
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies and scripts (start, dev, test)
└── README.md                      # Complete API reference documentation
```

---

## 4. API Endpoints Specification

| Method | Endpoint | Description | Status Codes |
|:---|:---|:---|:---|
| `GET` | `/` | API Information & Route Directory | `200 OK` |
| `GET` | `/preview` | Interactive Visual UI & API Tester | `200 OK` |
| `GET` | `/health` | Server Health & Uptime Status | `200 OK` |
| `GET` | `/api/products` | Paginated product list with search/filter/sort | `200 OK` |
| `GET` | `/api/products/:id` | Fetch product by ID | `200 OK`, `404 Not Found` |
| `GET` | `/api/products/categories` | Unique category list with product counts | `200 OK` |
| `GET` | `/api/products/stats` | Aggregated statistics (averages, counts) | `200 OK` |
| `POST` | `/api/products` | Create a new product | `201 Created`, `400 Bad Request` |
| `PUT` | `/api/products/:id` | Full update of a product | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `PATCH` | `/api/products/:id` | Partial update of a product | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/api/products/:id` | Delete product by ID | `200 OK`, `404 Not Found` |
| `POST` | `/api/products/reset` | Restore dataset to initial 100 products | `200 OK` |

---

## 5. Verification & Test Results

All 19 test cases in the test suite pass with 100% success rate:

```text
> node --test tests/api.test.js

▶ Express Products API Test Suite
  ✔ GET / - API Meta Root (177ms)
  ✔ GET /health - Healthcheck (10ms)
  ✔ GET /api/products - Returns 100 products total with default pagination (10ms)
  ✔ GET /api/products?page=2&limit=5 - Pagination behavior (11ms)
  ✔ GET /api/products?all=true - Returns all 100 products (19ms)
  ✔ GET /api/products?category=Electronics - Filters by category (6ms)
  ✔ GET /api/products?q=headphones - Text search (7ms)
  ✔ GET /api/products?sortBy=price&order=desc - Sorting (6ms)
  ✔ GET /api/products/categories - Distinct categories (10ms)
  ✔ GET /api/products/stats - Aggregated product statistics (9ms)
  ✔ GET /api/products/1 - Single product by ID (5ms)
  ✔ GET /api/products/9999 - Non-existent ID returns 404 (4ms)
  ✔ POST /api/products - Create product successfully (30ms)
  ✔ POST /api/products - Validation error on missing required fields (7ms)
  ✔ PUT /api/products/101 - Full update of existing product (10ms)
  ✔ PATCH /api/products/101 - Partial update of product (12ms)
  ✔ DELETE /api/products/101 - Remove product (6ms)
  ✔ POST /api/products/reset - Restore dataset back to 100 products (8ms)
  ✔ GET /unknown-route - 404 handler (3ms)
✔ Express Products API Test Suite (19 passed, 0 failed)
```

---

## 6. How to Run the Assignment

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Server**:
   ```bash
   npm start
   ```

3. **Run Automated Tests**:
   ```bash
   npm test
   ```

4. **Access in Browser**:
   - Interactive Preview: `http://localhost:5000/preview`
   - Products API: `http://localhost:5000/api/products`
