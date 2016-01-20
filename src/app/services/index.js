
export default angular.module('app.services', [])
  .service('AuthService',require('./auth'))
  .service('UserService',require('./user'))
  .service('ProductService',require('./product'))
  .service('OrderService',require('./order'))
  .service('DemoService',require('./demo'))
  .service('BookService', require('./books'))
  .name;
