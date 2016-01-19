export default 'app.controllers.products';

angular.module('app.controllers.products', [])
  .controller('products.list', require('./list'))
  .controller('products.new', require('./new'))
  .controller('products.edit', require('./edit'))
  .controller('products.detail', require('./detail'));
