/**
 * Created by linxy on 2016/1/19.
 */
export  default class BookService {
  constructor($http) {
    this.$http = $http;
  }

  findAll(params) {
    return this.$http({
      method: 'GET',
      params: params,
      url: '/api/Book/GetBooks'
    });
  }
}

BookService.$inject = ['$http'];
