const secret = (request, response) => {
  response.send(JSON.stringify(request['tokenData']));
};

module.exports = secret;
