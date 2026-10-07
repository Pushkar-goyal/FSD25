const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { validateCreateProduct, validatePatchProduct } = require('../middleware/validateProduct');

router.get('/categories', productsController.getCategories);
router.get('/stats', productsController.getProductStats);
router.post('/reset', productsController.resetProducts);

router.get('/', productsController.getAllProducts);
router.post('/', validateCreateProduct, productsController.createProduct);

router.get('/:id', productsController.getProductById);
router.put('/:id', validateCreateProduct, productsController.updateProduct);
router.patch('/:id', validatePatchProduct, productsController.patchProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
