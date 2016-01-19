
export default class DetailController {

  constructor($state,OrderService) {
    this.$state=$state;
    this.OrderService = OrderService;

    //获取当前的Id
    this.id = $state.params.id;
    this.data = {};
    this.loading = true;

    this.loadData();
  }

  loadData(){
    this.OrderService.get(this.id)
    .then((response)=>{

      this.loading=false;
      if(response.data.status!=200){
        this.errorMessage = response.data.message;
        return;
      }

      this.data = response.data.data;
    },(err)=>{
      this.errorMessage = err.Message;
      this.loading = false;
    });
  }

  goback(){
    history.back();
  }
}

DetailController.$inject=['$state','OrderService'];
