function validateCreateProduct(req, res, next) {
  const errors = [];

  if (!req.body.title || req.body.title.trim() === '') {
    errors.push('title is required');
  }

  if (!req.body.category || req.body.category.trim() === '') {
    errors.push('category is required');
  }

  if (req.body.price === undefined || Number.isNaN(Number(req.body.price))) {
    errors.push('price must be a valid number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
}

function validatePatchProduct(req, res, next) {
  const allowed = ['title', 'description', 'category', 'price', 'discountPercentage', 'rating', 'stock', 'brand', 'sku', 'tags', 'warrantyInformation', 'returnPolicy', 'thumbnail', 'images'];
  const invalid = Object.keys(req.body).filter(key => !allowed.includes(key));

  if (invalid.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [`Invalid field(s): ${invalid.join(', ')}`]
    });
  }

  next();
}

module.exports = { validateCreateProduct, validatePatchProduct };
