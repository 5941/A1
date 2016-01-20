import home from './home';
import products from './products';
import orders from './orders';
import demo from './demo';
import books from './books';

export default 'app.controllers';

angular.module('app.controllers', [home, products, orders, demo, books])
.controller('signin',require('./signin'))
.controller('signup',require('./signup'))
.controller('app',require('./app'));
