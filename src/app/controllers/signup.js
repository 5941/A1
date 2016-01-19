export default class SignupController {

  constructor($state, UserService) {
    this.$state = $state;
    this.UserService = UserService;

    this.loading = false;
    this.formData = {};
    this.confirmPasswordForm = {};
    this.successMessage='';
  }

  clearStatus(){
    this.errorMessage='';
    this.successMessage='';
  }

  signup(valid) {

    this.clearStatus();

    if (this.loading === true) {
      return;
    }

    this.confirmPasswordForm.$error = false;
    if (this.formData.password !== this.formData.confirmPassword) {
      this.ConfirmPasswordForm.$error = true;
      return;
    }

    if (!valid) {
      return;
    }

    //设置loading
    this.loading = true;

    this.UserService.register(this.formData)
      .then((response) => {

        if(response.data.status!=200){
          this.errorMessage = response.data.message;
          this.loading = false;
          return;
        }

        this.successMessage = '注册成功！'
        this.loading = false;
      }, (err) => {
        this.errorMessage = '网络异常，请稍后重试';
        this.loading = false;
      });
  }
}

SignupController.$inject = ['$state', 'UserService'];
