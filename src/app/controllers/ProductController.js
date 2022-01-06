const ProductsRepository = require('../repositories/ProductsRepository');

class ProductController {
  async index(request, response) {
    const products = await ProductsRepository.find();

    response.json(products);
  }

  async show(request, response) {
    const { id } = request.body;
    const product = await ProductsRepository.findById(id);

    if(!product) {
      response.status(404).json({error: 'Product not found'});
    }

    response.json(product);
  }

  async store(request, response) {
    const {
      id, name, price, quantity_in_stock,
    } = request.body;

    if (!id) {
      return response.status(400).json({ error: 'Id is required' });
    }

    if (!name) {
      response.status(400).json({ error: 'Name is required' });
    }

    const product = await ProductsRepository.create({
      id, name, price, quantity_in_stock,
    });

    return response.json(product);
  }
}

module.exports = new ProductController();
