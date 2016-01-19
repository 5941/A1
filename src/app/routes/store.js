export default function routes($stateProvider, $urlRouterProvider) {
  // 店铺首页
  $stateProvider
    .state('app.store', {
      url: '/store',
      template: require('../views/store/index.html'),
      controllerAs: 'vm',
      authenticate: true
    });
}
