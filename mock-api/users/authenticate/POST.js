const jwt = require('jsonwebtoken');

module.exports = function (request, response) {
  const origin = request.get('Origin');
  response.set({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': true,
  });
  response.json({
    token: jwt.sign(
      {
        data: request.body.username,
      },
      'secret',
      { expiresIn: '1h' },
    ),
  });
};
