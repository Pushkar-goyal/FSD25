const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { validateCreateProduct, validatePatchProduct } = require('../middleware/validateProduct');

// Product statistics & aggregate routes (must precede :id)
router.get('/categories', productsController.getCategories);
router.get('/stats', productsController.getProductStats);
router.post('/reset', productsController.resetProducts);

// Collection routes
router.get('/', productsController.getAllProducts);
router.post('/', validateCreateProduct, productsController.createProduct);

// Single item routes
router.get('/:id', productsController.getProductById);
router.put('/:id', validateCreateProduct, productsController.updateProduct);
router.patch('/:id', validatePatchProduct, productsController.patchProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
