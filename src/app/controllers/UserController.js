const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    const { orderBy } = request.query;
    const user = await UsersRepository.find(orderBy);

    response.json(user);
  }
}

module.exports = new UserController();
