
export default class DetailController {

  constructor($state,ProductService) {
    this.$state=$state;
    this.ProductService = ProductService;

    //获取当前的Id
    this.id = $state.params.id;
    this.formData={};
    this.loading = true;

    this.loadData();
  }

  loadData() {

    this.loading = true;
    this.ProductService.get(this.id)
      .then((resp) => {
        this.loading = false;
        if (resp.data.status == 200) {
          this.formData = resp.data.data;
          return;
        }
        this.errorMessage = resp.data.messgae;

      }, (err) => {
        this.errorMessage = err.data.data.Message;
        this.loading = false;
      });
  }

  goback(){
    history.back();
  }
}

DetailController.$inject=['$state','ProductService'];
