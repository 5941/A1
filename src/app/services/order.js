/**
* 商品服务
*/
export default class OrderService {
  constructor($http) {
    this.$http = $http;
  }

  findAll(params){
    params.pageNumber = params.pageNumber||1;
    params.pageSize = params.pageSize || 10;
    return this.$http({
      method:'GET',
      params: params,
      url:'/api/Order/GetOrders'
    });
  }

  get(id){
    return this.$http({
      method:'GET',
      url:'/api/Order/getOrder',
      params:{orderId:id}
    })
  }

  save(data){
    return this.$http({
      method:'POST',
      data:data,
      url:'/api/Order/addOrder'
    });
  }

  destory(id){
    return this.$http({
      method:'POST',
      url:'/api/Order/deleteOrder',
      params:{orderId:id}
    });
  }

  update(data){
    return this.$http({
      method:'POST',
      url:'/api/Order/updateOrder',
      data:data
    });
  }
}

OrderService.$inject=['$http'];
