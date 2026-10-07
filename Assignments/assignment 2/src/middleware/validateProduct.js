/**
 * Validation middleware for product creation and updates
 */

function validateCreateProduct(req, res, next) {
  const { title, price, category, stock } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push("Field 'title' is required and must be a non-empty string.");
  }

  if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
    errors.push("Field 'price' is required and must be a positive number.");
  }

  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    errors.push("Field 'category' is required and must be a non-empty string.");
  }

  if (stock !== undefined && (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0)) {
    errors.push("Field 'stock' must be a non-negative integer.");
  }

  if (req.body.rating !== undefined && (typeof req.body.rating !== 'number' || req.body.rating < 0 || req.body.rating > 5)) {
    errors.push("Field 'rating' must be a number between 0 and 5.");
  }

  if (req.body.discountPercentage !== undefined && (typeof req.body.discountPercentage !== 'number' || req.body.discountPercentage < 0 || req.body.discountPercentage > 100)) {
    errors.push("Field 'discountPercentage' must be a number between 0 and 100.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
}

function validatePatchProduct(req, res, next) {
  const allowedFields = [
    'title', 'description', 'category', 'price', 'discountPercentage',
    'rating', 'stock', 'brand', 'sku', 'tags', 'warrantyInformation',
    'returnPolicy', 'thumbnail', 'images'
  ];

  const updates = Object.keys(req.body);
  if (updates.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one field must be provided for update.'
    });
  }

  const errors = [];

  for (const field of updates) {
    if (!allowedFields.includes(field)) {
      errors.push(`Field '${field}' is not editable.`);
    }
  }

  if (req.body.price !== undefined && (typeof req.body.price !== 'number' || req.body.price < 0)) {
    errors.push("Field 'price' must be a positive number.");
  }

  if (req.body.stock !== undefined && (typeof req.body.stock !== 'number' || !Number.isInteger(req.body.stock) || req.body.stock < 0)) {
    errors.push("Field 'stock' must be a non-negative integer.");
  }

  if (req.body.rating !== undefined && (typeof req.body.rating !== 'number' || req.body.rating < 0 || req.body.rating > 5)) {
    errors.push("Field 'rating' must be a number between 0 and 5.");
  }

  if (req.body.discountPercentage !== undefined && (typeof req.body.discountPercentage !== 'number' || req.body.discountPercentage < 0 || req.body.discountPercentage > 100)) {
    errors.push("Field 'discountPercentage' must be a number between 0 and 100.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
}

module.exports = {
  validateCreateProduct,
  validatePatchProduct
};
