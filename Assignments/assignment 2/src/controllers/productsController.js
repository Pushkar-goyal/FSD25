const initialProducts = require('../data/products.json');

// In-memory working copy
let products = JSON.parse(JSON.stringify(initialProducts));

/**
 * Reset dataset back to initial 100 products
 */
function resetData() {
  products = JSON.parse(JSON.stringify(initialProducts));
  return products;
}

/**
 * GET /api/products
 * Query options:
 * - q: text search in title, description, brand, category, tags
 * - category: filter by category
 * - brand: filter by brand
 * - minPrice, maxPrice: price range
 * - inStock: "true" | "false"
 * - minRating: minimum product rating
 * - sortBy: id | title | price | rating | stock | createdAt (default: id)
 * - order: asc | desc (default: asc)
 * - page: page number (default: 1)
 * - limit: items per page (default: 10, max: 100). Set to 0 or pass all=true for all
 */
function getAllProducts(req, res) {
  let result = [...products];
  const {
    q,
    category,
    brand,
    minPrice,
    maxPrice,
    inStock,
    minRating,
    sortBy = 'id',
    order = 'asc',
    page = 1,
    limit = 10,
    all = false
  } = req.query;

  // Search filter
  if (q && typeof q === 'string') {
    const keyword = q.toLowerCase().trim();
    result = result.filter(p =>
      p.title.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword) ||
      p.brand.toLowerCase().includes(keyword) ||
      p.category.toLowerCase().includes(keyword) ||
      (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(keyword)))
    );
  }

  // Category filter
  if (category && typeof category === 'string') {
    const targetCat = category.toLowerCase().trim();
    result = result.filter(p => p.category.toLowerCase() === targetCat);
  }

  // Brand filter
  if (brand && typeof brand === 'string') {
    const targetBrand = brand.toLowerCase().trim();
    result = result.filter(p => p.brand.toLowerCase() === targetBrand);
  }

  // Price filters
  if (minPrice !== undefined && !isNaN(Number(minPrice))) {
    result = result.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice !== undefined && !isNaN(Number(maxPrice))) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  // inStock filter
  if (inStock !== undefined) {
    const stockCheck = String(inStock).toLowerCase() === 'true';
    result = result.filter(p => (stockCheck ? p.stock > 0 : p.stock === 0));
  }

  // minRating filter
  if (minRating !== undefined && !isNaN(Number(minRating))) {
    result = result.filter(p => p.rating >= Number(minRating));
  }

  // Sorting
  const sortDirection = order.toLowerCase() === 'desc' ? -1 : 1;
  result.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (valA === undefined) return 1;
    if (valB === undefined) return -1;

    if (typeof valA === 'string') {
      return valA.localeCompare(valB) * sortDirection;
    }
    return (valA - valB) * sortDirection;
  });

  const total = result.length;

  // Return all if requested
  if (all === 'true' || all === true || Number(limit) === 0) {
    return res.status(200).json({
      success: true,
      total,
      count: result.length,
      page: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
      data: result
    });
  }

  // Pagination calculations
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const totalPages = Math.ceil(total / parsedLimit) || 1;
  const startIndex = (parsedPage - 1) * parsedLimit;
  const paginatedData = result.slice(startIndex, startIndex + parsedLimit);

  return res.status(200).json({
    success: true,
    total,
    count: paginatedData.length,
    page: parsedPage,
    limit: parsedLimit,
    totalPages,
    hasNextPage: parsedPage < totalPages,
    hasPrevPage: parsedPage > 1,
    data: paginatedData
  });
}

/**
 * GET /api/products/:id
 */
function getProductById(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Product ID must be a valid integer.'
    });
  }

  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${id} was not found.`
    });
  }

  return res.status(200).json({
    success: true,
    data: product
  });
}

/**
 * GET /api/products/categories
 */
function getCategories(req, res) {
  const categoryMap = {};

  for (const product of products) {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = 0;
    }
    categoryMap[product.category]++;
  }

  const categories = Object.keys(categoryMap).map(name => ({
    name,
    productCount: categoryMap[name]
  }));

  return res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
}

/**
 * GET /api/products/stats
 */
function getProductStats(req, res) {
  if (products.length === 0) {
    return res.status(200).json({
      success: true,
      data: {
        totalProducts: 0,
        totalStock: 0,
        averagePrice: 0,
        minPrice: 0,
        maxPrice: 0,
        averageRating: 0,
        categoryCount: 0
      }
    });
  }

  let totalPrice = 0;
  let totalRating = 0;
  let totalStock = 0;
  let minPrice = products[0].price;
  let maxPrice = products[0].price;
  const categoryCounts = {};

  for (const p of products) {
    totalPrice += p.price;
    totalRating += p.rating;
    totalStock += p.stock;
    if (p.price < minPrice) minPrice = p.price;
    if (p.price > maxPrice) maxPrice = p.price;

    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  }

  const stats = {
    totalProducts: products.length,
    totalStock,
    averagePrice: Number((totalPrice / products.length).toFixed(2)),
    minPrice: Number(minPrice.toFixed(2)),
    maxPrice: Number(maxPrice.toFixed(2)),
    averageRating: Number((totalRating / products.length).toFixed(2)),
    categoriesCount: Object.keys(categoryCounts).length,
    categoryBreakdown: categoryCounts
  };

  return res.status(200).json({
    success: true,
    data: stats
  });
}

/**
 * POST /api/products
 */
function createProduct(req, res) {
  const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const now = new Date().toISOString();

  const newProduct = {
    id: nextId,
    title: req.body.title.trim(),
    description: req.body.description || `Premium quality ${req.body.title}.`,
    category: req.body.category.trim(),
    price: Number(req.body.price),
    discountPercentage: req.body.discountPercentage !== undefined ? Number(req.body.discountPercentage) : 0,
    rating: req.body.rating !== undefined ? Number(req.body.rating) : 5.0,
    stock: req.body.stock !== undefined ? parseInt(req.body.stock, 10) : 10,
    brand: req.body.brand ? req.body.brand.trim() : 'Generic',
    sku: req.body.sku || `PROD-${String(nextId).padStart(4, '0')}`,
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    warrantyInformation: req.body.warrantyInformation || '1-year standard warranty',
    returnPolicy: req.body.returnPolicy || '30-day return policy',
    thumbnail: req.body.thumbnail || `https://images.unsplash.com/photo-placeholder-${nextId}?auto=format&fit=crop&w=400&q=80`,
    images: Array.isArray(req.body.images) && req.body.images.length > 0
      ? req.body.images
      : [`https://images.unsplash.com/photo-placeholder-${nextId}?auto=format&fit=crop&w=800&q=80`],
    createdAt: now
  };

  products.push(newProduct);

  return res.status(201).json({
    success: true,
    message: 'Product created successfully.',
    data: newProduct
  });
}

/**
 * PUT /api/products/:id (Full Replacement)
 */
function updateProduct(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Product ID must be a valid integer.'
    });
  }

  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${id} was not found.`
    });
  }

  const existing = products[index];
  const updatedProduct = {
    ...existing,
    title: req.body.title.trim(),
    description: req.body.description !== undefined ? req.body.description : existing.description,
    category: req.body.category.trim(),
    price: Number(req.body.price),
    discountPercentage: req.body.discountPercentage !== undefined ? Number(req.body.discountPercentage) : existing.discountPercentage,
    rating: req.body.rating !== undefined ? Number(req.body.rating) : existing.rating,
    stock: req.body.stock !== undefined ? parseInt(req.body.stock, 10) : existing.stock,
    brand: req.body.brand !== undefined ? req.body.brand.trim() : existing.brand,
    sku: req.body.sku !== undefined ? req.body.sku : existing.sku,
    tags: Array.isArray(req.body.tags) ? req.body.tags : existing.tags,
    warrantyInformation: req.body.warrantyInformation || existing.warrantyInformation,
    returnPolicy: req.body.returnPolicy || existing.returnPolicy,
    thumbnail: req.body.thumbnail || existing.thumbnail,
    images: Array.isArray(req.body.images) ? req.body.images : existing.images,
    updatedAt: new Date().toISOString()
  };

  products[index] = updatedProduct;

  return res.status(200).json({
    success: true,
    message: `Product ${id} updated successfully.`,
    data: updatedProduct
  });
}

/**
 * PATCH /api/products/:id (Partial Update)
 */
function patchProduct(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Product ID must be a valid integer.'
    });
  }

  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${id} was not found.`
    });
  }

  const existing = products[index];
  const patchData = { ...req.body };
  delete patchData.id;
  delete patchData.createdAt;

  if (patchData.price !== undefined) patchData.price = Number(patchData.price);
  if (patchData.stock !== undefined) patchData.stock = parseInt(patchData.stock, 10);
  if (patchData.rating !== undefined) patchData.rating = Number(patchData.rating);
  if (patchData.discountPercentage !== undefined) patchData.discountPercentage = Number(patchData.discountPercentage);

  const updatedProduct = {
    ...existing,
    ...patchData,
    updatedAt: new Date().toISOString()
  };

  products[index] = updatedProduct;

  return res.status(200).json({
    success: true,
    message: `Product ${id} patched successfully.`,
    data: updatedProduct
  });
}

/**
 * DELETE /api/products/:id
 */
function deleteProduct(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Product ID must be a valid integer.'
    });
  }

  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${id} was not found.`
    });
  }

  const [deletedProduct] = products.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: `Product ${id} deleted successfully.`,
    data: deletedProduct
  });
}

/**
 * POST /api/products/reset (Helper for resetting demo data)
 */
function resetProducts(req, res) {
  const data = resetData();
  return res.status(200).json({
    success: true,
    message: 'Products reset to initial 100 items.',
    total: data.length
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  getCategories,
  getProductStats,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
  resetProducts,
  resetData
};
