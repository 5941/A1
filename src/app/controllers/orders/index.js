import sales from './sales';

export default angular.module('app.controllers.orders', [sales])
  .controller('orders.list',require('./list'))
  .controller('orders.detail',require('./detail'))
  .controller('orders.new',require('./new'))
  .controller('orders.edit',require('./edit'))
  .name;
