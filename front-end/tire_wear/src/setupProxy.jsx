const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/model.json',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Change this to the actual URL of your server
      changeOrigin: true,
    })
  );
};
