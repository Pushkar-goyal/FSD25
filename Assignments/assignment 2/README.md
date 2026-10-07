# 🛒 Express.js Products REST API

A clean, production-ready Express.js REST API preloaded with **100 realistic e-commerce products** across 10 diverse categories. Includes full CRUD operations, multi-attribute filtering, pagination, text search, sorting, statistics, request validation, and an automated test suite.

---

## 🚀 Quick Start

### 1. Requirements
- **Node.js**: v18+ (tested on v24)
- **npm**: v9+

### 2. Installation
```bash
# Navigate to project directory
cd express-products-api

# Install dependencies
npm install
```

### 3. Environment Setup
The `.env` file is already created. You can customize the port if needed:
```env
PORT=5000
NODE_ENV=development
```

### 4. Running the Server
```bash
# Production / Standard start
npm start

# Development mode with auto-reload (nodemon)
npm run dev
```

The server will be running at `http://localhost:5000`.

### 5. Running Tests
Run the built-in automated test suite (19 test cases covering all endpoints):
```bash
npm test
```

---

## 📦 Project Structure

```
express-products-api/
├── src/
│   ├── data/
│   │   └── products.json          # 100 rich, realistic product records
│   ├── controllers/
│   │   └── productsController.js  # CRUD, filtering, pagination, search, & stats logic
│   ├── middleware/
│   │   ├── errorHandler.js        # 404 & centralized error handlers
│   │   └── validateProduct.js     # Request body validator for POST/PUT/PATCH
│   ├── routes/
│   │   └── productsRoutes.js      # REST API route mappings
│   ├── app.js                     # Express setup, CORS, JSON parser & logger
│   └── server.js                  # Server bootstrap & graceful shutdown
├── tests/
│   └── api.test.js                # 19 automated integration tests
├── client.http                    # Ready-to-use HTTP requests for VS Code REST Client
├── .env.example                   # Environment configuration template
├── .env                           # Local environment config
├── .gitignore                     # Git ignore rules
├── package.json                   # Project scripts and dependencies
└── README.md                      # Documentation & API reference
```

---

## 📡 API Reference

### Base URL
```
http://localhost:5000
```

### Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API description and links directory |
| `GET` | `/health` | Server health check and uptime |
| `GET` | `/api/products` | Paginated product list with search/filter/sort |
| `GET` | `/api/products/:id` | Fetch single product by numeric ID |
| `GET` | `/api/products/categories` | List all unique categories with product counts |
| `GET` | `/api/products/stats` | Summary statistics (averages, counts, breakdown) |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Full update / replacement of a product |
| `PATCH` | `/api/products/:id` | Partial update of product fields |
| `DELETE` | `/api/products/:id` | Delete product by ID |
| `POST` | `/api/products/reset` | Reset dataset back to original 100 products |

---

## 🔍 Query Parameters for `GET /api/products`

| Parameter | Type | Default | Example | Description |
|---|---|---|---|---|
| `q` | `string` | — | `?q=headphones` | Search in title, description, brand, category, and tags |
| `category` | `string` | — | `?category=Electronics` | Filter by category name |
| `brand` | `string` | — | `?brand=AuraTech` | Filter by brand name |
| `minPrice` | `number` | — | `?minPrice=50` | Filter items with price >= minPrice |
| `maxPrice` | `number` | — | `?maxPrice=250` | Filter items with price <= maxPrice |
| `inStock` | `boolean` | — | `?inStock=true` | `true` (stock > 0) or `false` (stock = 0) |
| `minRating` | `number` | — | `?minRating=4.5` | Filter items with rating >= minRating |
| `sortBy` | `string` | `id` | `?sortBy=price` | Field to sort by (`id`, `price`, `rating`, `title`, etc.) |
| `order` | `string` | `asc` | `?order=desc` | Sort direction (`asc` or `desc`) |
| `page` | `number` | `1` | `?page=2` | Page number (1-indexed) |
| `limit` | `number` | `10` | `?limit=20` | Products per page (max: 100) |
| `all` | `boolean` | `false` | `?all=true` | Set to `true` to return all matching products at once |

---

## 💡 Example Requests (cURL)

### 1. Get Products with Pagination & Filter
```bash
curl "http://localhost:5000/api/products?category=Electronics&minPrice=100&sortBy=price&order=desc"
```

### 2. Search Products
```bash
curl "http://localhost:5000/api/products?q=wireless"
```

### 3. Get Category Breakdown
```bash
curl "http://localhost:5000/api/products/categories"
```

### 4. Get Statistics
```bash
curl "http://localhost:5000/api/products/stats"
```

### 5. Create a Product
```bash
curl -X POST "http://localhost:5000/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AeroFlight Pro Drone",
    "description": "8K Camera Drone with obstacle avoidance.",
    "category": "Electronics",
    "price": 899.99,
    "stock": 15,
    "brand": "AeroTech",
    "tags": ["drone", "camera", "8k"]
  }'
```

### 6. Partial Update (PATCH)
```bash
curl -X PATCH "http://localhost:5000/api/products/1" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 279.99,
    "stock": 50
  }'
```

### 7. Delete a Product
```bash
curl -X DELETE "http://localhost:5000/api/products/1"
```

---

## 🗂️ Product Data Schema

Each product object adheres to the following structure:

```json
{
  "id": 1,
  "title": "UltraSound Pro Noise-Cancelling Headphones",
  "description": "High performance ultrasound pro noise-cancelling headphones crafted by AuraTech...",
  "category": "Electronics",
  "price": 299.99,
  "discountPercentage": 12.5,
  "rating": 4.8,
  "stock": 45,
  "brand": "AuraTech",
  "sku": "ELEC-001",
  "tags": ["audio", "bluetooth", "noise-cancelling", "wireless"],
  "warrantyInformation": "2-year comprehensive manufacturer warranty",
  "returnPolicy": "30-day hassle-free return policy",
  "thumbnail": "https://images.unsplash.com/photo-placeholder-1?auto=format&fit=crop&w=400&q=80",
  "images": [
    "https://images.unsplash.com/photo-placeholder-1-1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-placeholder-1-2?auto=format&fit=crop&w=800&q=80"
  ],
  "createdAt": "2025-01-03T20:00:00.000Z"
}
```
