export default ProductFilterDirective;

function ProductFilterDirective() {
  return {
    scope:{
      show:'=',
      selectedItems:'=',
      onChange:"&"
    },
    restrict: 'AE',
    template: require('./product.html'),
    controller: ProductFilterController
  }
}

function ProductFilterController($scope,ProductService){
  $scope.show = false;
  $scope.loading = true;
  $scope.selectedItems = [];
  $scope.query={
    PageNumber:1,
    PageSize:10,
    codeOrName:''
  }

  $scope.close=()=>{
    $scope.show =false;
  }

  $scope.fetchData =(params)=>{

    $scope.loading=true;
    ProductService.findAll(params).then((response)=>{
      var data = response.data.data||{};
      $scope.data = {
        items: data.Data||[],
        total: data.TotalRecords||0,
        page: data.PageNumber||1
      };
      $scope.loading=false;
    });
  }
  $scope.go=(page)=>{
    $scope.query.PageNumber = page;
    $scope.fetchData($scope.query);
  }

  // 添加商品
  $scope.add=(item)=>{
    item.Quantity=1;
    $scope.selectedItems.push(item);
  };

  $scope.remove=(item)=>{
    let index = _.findIndex($scope.selectedItems,(p)=>{
      return p.ID == item.ID;
    });
    $scope.selectedItems.splice(index,1);
  };

  $scope.disabled=(item)=>{
    return _.findIndex($scope.selectedItems,(p)=>{
      return p.ID == item.ID;
    })>-1;
  };

  $scope.search=()=>{
    $scope.query.pageNumber=1;
    $scope.fetchData($scope.query);
  };

  $scope.loadData=()=>{
    $scope.query.PageNumber = 1;
    $scope.query.pageSize = 10;

    $scope.fetchData($scope.query);
  };

  $scope.loadData();
}

ProductFilterController.$inject=['$scope','ProductService'];
