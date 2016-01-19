/**
 * 默认首页控制器
 */
export default class ListController {

  constructor($scope,$state, $location,$timeout, ProductService) {
    this.$scope = $scope;
    this.$state=$state;
    this.$location = $location;
    this.$timeout = $timeout;
    this.ProductService = ProductService;
    this.loading = true;

    let {pageNumber,codeOrName} = $location.search();

    this.query = {
      pageSize :10,
      pageNumber:pageNumber||1,
      codeOrName :codeOrName||''
    };

    this.data = {
      items: [],
      total:0
    };

    this.loadData();
  }

  loadData() {
    this.fetchData(this.query);
  }

  search(){
    this.query.pageNumber=1;
    this.$location.search(this.query);
    this.fetchData(this.query);
    return;
  }

  delete(id){
    if(!confirm('确认删除商品吗?')){
      return
    };

    this.ProductService.destory(id)
    .then((response)=>{
      this.loadData();
    },(err)=>{
      alert(err.data.Message);
    });
  }

  go(pageNumber){

    this.query.pageNumber = pageNumber;
    this.$location.search(this.query);
    this.fetchData(this.query);
    return;
  }

  fetchData(params) {

    this.loading = true;

    this.ProductService.findAll(params)
      .then((response) => {
        var data = response.data.data||{};
          this.data={
            items: data.Data||[],
            total: data.TotalRecords||0,
            page: data.PageNumber||1
          };
          this.loading=false;
      },(err)=>{
        this.errorMessage = err.data.Message;
        this.loading = false;
      });
  }
}

ListController.$inject = ['$scope','$state','$location','$timeout', 'ProductService'];
