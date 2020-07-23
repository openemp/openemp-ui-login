module.exports = function (request, response) {
  const origin = request.get('Origin');
  response.set({
    'Access-Control-Allow-Origin': origin,
    Allow: 'OPTIONS, GET, HEAD, POST',
    'Access-Control-Allow-Headers': 'content-type',
  });
  response.send();
};
