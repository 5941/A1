export default class EditController {

  constructor($state, ProductService) {
    this.$state = $state;
    this.ProductService = ProductService;
    this.formData = {};
    this.loading = true;

    // 获取通过params传递的参数
    this.id = $state.params.id;

    this.loadData();
  }

  goback() {
    history.back();
  }

  save(valid) {

    if (!valid) {
      return;
    }

    if(this.loading){
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.ProductService.update(this.formData)
      .then((resp) => {
        this.loading = false;
        if (resp.data.status == 200) {
          this.successMessage = '商品信息保存成功'
          return;
        }
        console.log(resp.data);
        this.errorMessage = resp.data.message;

      }, (err) => {
        this.errorMessage = err.data.data.Message;
        this.loading = false;
      });
  }

  loadData() {
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
}

EditController.$inject = ['$state', 'ProductService'];
