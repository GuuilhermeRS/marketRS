const { Router } = require('express');
const ProductController = require('./app/controllers/ProductController');

const router = Router();

router.get('/products', ProductController.index);
router.post('/products', ProductController.store);

module.exports = router;
