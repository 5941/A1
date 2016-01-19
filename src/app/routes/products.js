export default function routes($stateProvider, $urlRouterProvider) {

  //商品管理路由
  $stateProvider
    .state('app.products', {
      url: '/products',
      abstract: true,
      template: '<ui-view/>'
    });

  $stateProvider
    .state('app.products.list', {
      url: '',
      brandcrumb: {
        title: '商品管理 -> 商品列表'
      },
      controller: 'products.list',
      template: require('../views/products/list.html'),
      controllerAs: 'vm',
      authenticate: false
    });

  $stateProvider
    .state('app.products.new', {
      url: '/new',
      brandcrumb: {
        title: '商品管理 -> 创建商品'
      },
      controller: 'products.new',
      template: require('../views/products/new.html'),
      controllerAs: 'vm',
      //authenticate: true
    });
    $stateProvider
      .state('app.products.edit', {
        url: '/edit/:id',
        brandcrumb: {
          title: '商品管理 -> 编辑商品'
        },
        controller: 'products.edit',
        template: require('../views/products/edit.html'),
        controllerAs: 'vm',
        //authenticate: true
      });

  $stateProvider
    .state('app.products.detail', {
      url: '/:id',
      brandcrumb: {
        title: '商品管理 -> 商品详情'
      },
      template: require('../views/products/detail.html'),
      controller: 'products.detail',
      controllerAs: 'vm',
      //authenticate: false
    });
}
