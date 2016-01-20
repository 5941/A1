/**
 * Created by linxy on 2016/1/19.
 */
export default function routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app.books', {
      url: '/books',
      abstract: true,
      template: '<ui-view/>'
    });
  $stateProvider
    .state('app.books.main', {
      url: '',
      controller: 'books.main',
      template: require('../views/books/main.html'),
      controllerAs: 'vm'
    });
}
