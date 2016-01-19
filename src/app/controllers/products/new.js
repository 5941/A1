export default class CreateController {

  constructor($state, ProductService) {
    this.$state = $state;
    this.ProductService = ProductService;
    this.formData = {
      Code:'P'+(new Date().getTime())
    };
    this.loading = false;
    this.errorMessage = '';
  }

  goback() {
    history.back();
  }

  reload(){
    this.$state.reload();
  }

  create(valid) {
    if (!valid) {
      return;
    }

    if(this.loading){
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.ProductService.create(this.formData)
      .then((response) => {
        this.loading = false;

        if(response.data.status!=200){
          this.errorMessage = response.data.message;
          return;
        }

        this.successMessage = '商品创建成功!';
        this.formData ={}; // clear from data

      }).catch((error) => {
        this.errorMessage = error.message;
        this.loading = false;
      });
  }
}

CreateController.$inject = ['$state', 'ProductService'];
