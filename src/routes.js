const { Router } = require('express');
const ProductController = require('./app/controllers/ProductController');

const router = Router();

router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products', ProductController.update);

module.exports = router;
