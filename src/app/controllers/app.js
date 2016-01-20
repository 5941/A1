/**
 * 应用程序全局处理controller
 * 说明： 控制应用程序外部的部分的显示和逻辑
 */
import _ from 'lodash';


/**
 * 应用程序统一的界面管理
 */
export default class AppController {
  constructor($state, $rootScope, $scope, AuthService, $location, UserService) {

    this.$state = $state;
    this.$scope = $scope;
    this.AuthService = AuthService;
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.UserService = UserService;
    this.userInfo = {};

    // 菜单列表
    this.menus = [{
      title: '店铺管理',
      route: '',
      active: false,
      iconClass: 'i i-home icon',
      children: [{
        title: '店铺信息维护',
        route: 'app.store',
      }, {
        title: '店员信息维护',
        route: '',
      }, {
        title: '店员权限维护',
        route: '',
      }]
    }, {
      title: '商品管理',
      route: '',
      iconClass: 'i i-stack icon',
      active: false,
      children: [{
        title: '商品信息维护',
        route: 'app.products.list',
      }]
    }, {
      title: '订单管理',
      route: '',
      iconClass: 'i i-cart icon',
      active: false,
      children: [{
        title: '订单中心',
        route: 'app.orders.list'
      }]
    }, {
      title: '进销存管理',
      route: '',
      iconClass: 'i i-switch icon',
      active: false,
      children: [{
        title: '供应商信息',
        route: '',
      }, {
        title: '进货单',
        route: '',
      }, {
        title: '退货单',
        route: '',
      }, {
        title: '进退货报表',
        route: '',
      }]
    }, {
      title: '书籍管理',
      route: '',
      iconClass: 'i i-stack icon',
      active: false,
      children: [{
        title: '书籍信息维护',
        route: 'app.books.main',
      }]
    },
      {
      title: '财务管理',
      route: '',
      iconClass: 'i i-grid3 icon',
      active: false,
      children: [{
        title: '开账',
        route: '',
      }, {
        title: '收入',
        route: '',
      }, {
        title: '支出',
        route: '',
      }, {
        title: '余额调整',
        route: '',
      }, {
        title: '资金流水',
        route: '',
      }, {
        title: '销货商品利润表',
        route: '',
      }, {
        title: '收支结余表',
        route: '',
      }, {
        title: '利润分析图',
        route: '',
      }, {
        title: '收支分析图',
        route: '',
      }, {
        title: '费用分析图',
        route: '',
      }]
    }];

    this.loadUserInfo();

  }

  /**
   * 切换菜单，对当前选择菜单做操作目前只对一级目录进行显示和隐藏
   */
  changeMenu(menu) {

    _.forEach(this.menus, (item) => {
      if (item.title === menu.title) {
        item.active = !item.active;
        return;
      }
    });
  }

  /**
   * 加载当前登录用户
   * @return {[type]} [description]
   */
  loadUserInfo() {
    this.UserService.get()
      .then((response) => {
        this.userInfo = response.data.data;
      });
  }

  /**logout*/
  logout() {
    this.AuthService.clear();
    location.href = '/#/signin';
  }

  go(menu) {
    this.$state.go(menu.route || 'app.main', {}, {
      location: 'replace'
    });
    return;
  }
}

AppController.$inject = ['$state', '$rootScope', '$scope', 'AuthService', '$location','UserService'];
