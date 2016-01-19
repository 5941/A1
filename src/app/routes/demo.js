export default function routes($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('app.demo', {
      url: '/demo',
      abstract: true,
      template: '<ui-view/>'
    });

  $stateProvider
    .state('app.demo.main', {
      url: '',
      controller: 'demo.main',
      template: require('../views/demo/main.html'),
      controllerAs: 'vm'
    });
}
