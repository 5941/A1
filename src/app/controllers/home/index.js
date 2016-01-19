export default 'app.controllers.home';

angular.module('app.controllers.home', [])
  .controller('home.main', require('./main'))
  .controller('home.detail', require('./detail'));
