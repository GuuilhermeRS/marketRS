const { Router } = require('express');
const ProductController = require('./app/controllers/ProductController');
const UserController = require('./app/controllers/UserController');

const IsAutenticated = require('./middleware/IsAuthenticated');

const auth = require('./routes/auth');
const secret = require('./routes/secret');

const router = Router();

router.post('/auth', auth);
router.get('/secret', IsAutenticated, secret);

router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show);
router.post('/products', ProductController.store);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

module.exports = router;
