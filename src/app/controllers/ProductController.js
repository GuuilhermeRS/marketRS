const ProductsRepository = require('../repositories/ProductsRepository');

class ProductController {
  async index(request, response) {
    const { orderBy } = request.query;
    const products = await ProductsRepository.find(orderBy);

    response.json(products);
  }

  async show(request, response) {
    const { id } = request.params;
    const product = await ProductsRepository.findById(id);

    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
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
      return response.status(400).json({ error: 'Name is required' });
    }

    const product = await ProductsRepository.create({
      id, name, price, quantity_in_stock,
    });

    return response.json(product);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, price, quantity_in_stock } = request.body;

    const productExist = await ProductsRepository.findById(id);
    if (!productExist) {
      return response.status(404).json({ error: 'Product not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const product = await ProductsRepository.update({
      id, name, price, quantity_in_stock,
    });

    response.json(product);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ProductsRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ProductController();
