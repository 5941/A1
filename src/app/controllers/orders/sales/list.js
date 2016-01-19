/**
 * 默认首页控制器
 */
export default class SaleListController {

  constructor($scope,$state, $location, OrderService) {
    this.$scope = $scope;
    this.$state=$state;
    this.$location = $location;
    this.OrderService = OrderService;
    this.loading = true;

    let {page} = $location.search();

    this.pageSize = 10;
    this.pageIndex = page||1;

    this.data = {
      items: [],
      total:0
    };

   this.fetchData(this.pageIndex);
  }

  go(page){

    this.$location.search({page:page});
    this.pageIndex= page;
    this.fetchData(page);
    return;
  }

  fetchData(page) {

    this.loading = true;
    const query ={
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };

    this.OrderService.findAll(query)
      .then((response) => {
          this.data={
            items: response.data.data.Data,
            total: response.data.data.TotalRecords,
            page: response.data.data.PageNumber
          };
          this.loading=false;
      }).catch((err)=>{
        this.errorMessage = err.message;
        this.loading = false;
      });
  }
}

SaleListController.$inject = ['$scope','$state','$location','OrderService'];
