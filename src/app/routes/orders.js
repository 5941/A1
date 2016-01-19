export default function routes($stateProvider, $urlRouterProvider) {

  //订单管理路由
  $stateProvider
    .state('app.orders', {
      url: '/orders',
      abstract: true,
      template: '<ui-view/>'
    });

  $stateProvider
      .state('app.orders.new', {
        url: '/new',
        controller:'orders.new',
        controllerAs:'vm',
        brandcrumb: {
          title: '订单管理 -> 新建订单'
        },
        template: require('../views/orders/new.html'),
  });

  $stateProvider
    .state('app.orders.list', {
      url: '/list',
      controller:'orders.list',
      controllerAs:'vm',
      brandcrumb: {
        title: '订单管理 -> 订单列表'
      },
      template: require('../views/orders/list.html'),
    });

    $stateProvider
      .state('app.orders.detail', {
        url: '/:id',
        controller:'orders.detail',
        controllerAs:'vm',
        brandcrumb: {
          title: '订单管理 -> 订单详情'
        },
        template: require('../views/orders/detail.html'),
      });

      $stateProvider
        .state('app.orders.edit', {
          url: '/:id/edit',
          controller:'orders.edit',
          controllerAs:'vm',
          brandcrumb: {
            title: '订单管理 -> 订单编辑'
          },
          template: require('../views/orders/edit.html'),
        });

    $stateProvider
      .state('app.orders.sales', {
        url: '/sales',
        controller:'orders.sales.list',
        controllerAs:'vm',
        brandcrumb: {
          title: '订单管理 -> 销货单管理'
        },
        template: require('../views/orders/sales/list.html')
      });

}
