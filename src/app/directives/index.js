
export default 'app.directives';

angular.module('app.directives', [])
  .directive('a1Loader',require('./loading'))
  .directive('a1Paging',require('./paging'))
  .directive('a1ProductFilter',require('./product_filter'));
