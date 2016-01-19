import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import ngCookies from 'angular-cookies';
import loadingBar from 'angular-loading-bar';

import routes from './routes';
import controllers from './controllers';
import services from './services';
import directives from './directives';

/**
 * 主程序，自动加载controllers,services
 */
angular.module('app', [
  uiRouter,
  ngMessages,
  loadingBar,
  ngCookies,
  routes,
  services,
  controllers,
  directives
]).config(['$httpProvider','$provide',($httpProvider, $provide) => {

  $provide.factory('TokenHttpInterceptor',['AuthService', function(AuthService) {
    return {
      request: function(config) {
        config.url = `/proxy${config.url}`;
        if(AuthService.isAuthenticated()){
            config.headers['X-Token'] = AuthService.getCurrentUser().access_token;
        }
        return config;
      }
    };
  }]);
  $httpProvider.interceptors.push('TokenHttpInterceptor');

}]).run(['$rootScope','$state','AuthService',($rootScope, $state, AuthService) => {

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {

    // 界面切换通过ui-router配置获取面包屑相关内容，并设置
    $rootScope.brandcrumb = toState.brandcrumb || {
      title: '--'
    };

    if (toState.authenticate && !AuthService.isAuthenticated()) {
      $rootScope.returnToState = toState;
      $rootScope.returnToStateParams = toParams;
      $state.transitionTo('signin');
      event.preventDefault();
    }
  });

}]);
