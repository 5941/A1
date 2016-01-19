export default class LoginController {

  constructor($state, $rootScope, AuthService, UserService) {
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.AuthService = AuthService;
    this.UserService = UserService;
    this.loading = false;
    this.formData = {};
  }

  clearStatus() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  login(valid) {

    this.clearStatus();

    // 防止多次点击
    if (this.loading === true) {
      return;
    }

    if (!valid) {
      return;
    }

    this.loading = true;

    this.UserService.token(this.formData)
      .then((response) => {

        if(response.data.status!=200){
          this.errorMessage = response.data.message;
          this.loading = false;
          return;
        }

        this.loading = false;
        this.AuthService.setCurrentUser(response.data.data);
        this.$state.go(this.$rootScope.returnToState || 'app.main', this.$rootScope.returnToStateParams || {});
      }, (error) => {
        this.errorMessage = '用户名或密码错误';
        this.loading = false;
      });
  }
}

LoginController.$inject = ['$state', '$rootScope', 'AuthService', 'UserService'];
