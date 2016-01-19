/**
 * 默认首页控制器
 */
export default class ListController {

  constructor($scope,$state, $location,$filter, OrderService) {
    this.$scope = $scope;
    this.$state=$state;
    this.$location = $location;
    this.$filter= $filter;
    this.OrderService = OrderService;
    this.loading = true;
    this.beginDate=null;
    this.endDate = null;

    let {pageNumber,code,beginDate,endDate} = $location.search();

    this.query={
      pageSize:10,
      pageNumber:pageNumber||1,
      code:code
    };

    this.data = {
      items: [],
      total:0
    };

   this.fetchData(this.query);
  }

  search(){
    this.$location.search(this.query);
    this.fetchData(this.query);
    return;
  }

  remove(id){
    if(!confirm('确认删除此订单吗?')){
      return
    };

    this.OrderService.destory(id)
    .then((response)=>{
      this.fetchData(this.query);
    },(err)=>{
      alert(err.data.Message);
    });
  }

  go(pageNumber){
    this.query.pageNumber=pageNumber;
    this.fetchData(this.query);
  }

  fetchData(params) {

    this.loading = true;

    //处理date
    if(this.beginDate){
      params.beginDate =  this.$filter('date')(this.beginDate,'yyyy-MM-dd');
    }else{
      delete params.beginDate;
    }

    if(this.endDate){
      params.endDate =this. $filter('date')(this.endDate,'yyyy-MM-dd');
    }else{
      delete params.endDate;
    }

    this.$location.search(this.query);

    this.OrderService.findAll(params)
      .then((response) => {
          var data= response.data.data||{};
          console.log(data);
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

ListController.$inject = ['$scope','$state','$location','$filter','OrderService'];
