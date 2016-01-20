export default 'app.routes';

angular.module('app.routes', []).config(function($stateProvider, $urlRouterProvider) {
  require('./app')($stateProvider, $urlRouterProvider);
  require('./products')($stateProvider, $urlRouterProvider);
  require('./orders')($stateProvider, $urlRouterProvider);
  require('./store')($stateProvider, $urlRouterProvider);
  require('./demo')($stateProvider, $urlRouterProvider);
  require('./books')($stateProvider, $urlRouterProvider);
});
