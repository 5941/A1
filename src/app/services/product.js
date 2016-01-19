/**
* 商品服务
*/
export default class ProductService {
  constructor($http) {
    this.$http = $http;
  }

  findAll(params){
    params.pageIndex = params.pageIndex||1;
    params.pageSize = params.pageSize || 10;
    return this.$http({
      method:'GET',
      params: params,
      url:'/api/Product/GetProducts'
    });
  }

  update(body){
    return this.$http({
      method:'POST',
      url:'/api/product/updateProduct',
      data:body
    })
  }

  get(id){
    return this.$http({
      method:'GET',
      url:'/api/product/getProduct',
      params:{productId:id}
    })
  }

  destory(id){
    return this.$http({
      method:'POST',
      url:'/api/product/deleteProduct',
      params:{productId:id}
    })
  }

  create(data){
    return this.$http({
      method:'POST',
      data:data,
      url:'/api/product/addProduct'
    });
  }
}

ProductService.$inject=['$http'];
