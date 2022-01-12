const { verify } = require('jsonwebtoken');

const IsAuthenticated = (request, response, next) => {
  try {
    const token = request.headers.authorization.replace('Bearer ', '');
    const validToken = verify(token, process.env.JWT_SALT);
    request['tokenData'] = validToken;
    next();
  } catch (err) {
    response.status(401).json('Unauthorized!');
  }
};

module.exports = IsAuthenticated;