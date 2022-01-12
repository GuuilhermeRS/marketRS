const { sign } = require('jsonwebtoken');

const auth = (request, response) => {
  const { nome, email } = request.body;

  const token = sign({
    nome, email,
  }, process.env.JWT_SALT, {
    expiresIn: 120,
  });

  return response.json({
    token,
  });
};

module.exports = auth;
