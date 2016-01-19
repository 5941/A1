export default function routes($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('', '/')
    .otherwise('/404');

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      template: require('../views/app.html'),
      controller: 'app',
      controllerAs: 'vm'
    });

  // 登陆界面
  $stateProvider
    .state('signin', {
      url: '/signin',
      template: require('../views/signin.html'),
      controller: 'signin',
      controllerAs: 'vm'
    });

  // 注册界面
  $stateProvider
    .state('signup', {
      url: '/signup',
      template: require('../views/signup.html'),
      controller: 'signup',
      controllerAs: 'vm'
    });

  // 404界面处理
  $stateProvider
    .state('404', {
      url: '/404',
      template: require('../views/404.html')
    });

  // 默认首页
  $stateProvider
    .state('app.main', {
      url: '/',
      brandcrumb: {
        title: '管理首页'
      },
      template: require('../views/home/main.html'),
      authenticate: true
    });
}
