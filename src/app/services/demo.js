/**
* Demo服务
*/
export default class DemoService {
  constructor($http) {
    this.$http = $http;
  }

  findAll(params){
    return this.$http({
      method:'GET',
      params: params,
      url:'/api/Product/GetProducts'
    });
  }
}

DemoService.$inject=['$http'];
