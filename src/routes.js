const { Router } = require('express');
const ProductController = require('./app/controllers/ProductController');
const UserController = require('./app/controllers/UserController');

const router = Router();

router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

router.get('/users', UserController.index);

module.exports = router;
