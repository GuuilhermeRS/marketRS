const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    const { orderBy } = request.query;
    const users = await UsersRepository.find(orderBy);

    response.json(users);
  }

  async show(request, response) {
    const { id } = request.params;
    const user = await UsersRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  }

  async store(request, response) {
    const { name, email, phone } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const emailExists = await UsersRepository.findByEmail(email);
    if (emailExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const user = await UsersRepository.create({ name, email, phone });

    response.json(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const user = await UsersRepository.update({
      id, name, email, phone,
    });

    response.json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    await UsersRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new UserController();
