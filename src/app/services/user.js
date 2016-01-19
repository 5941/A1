/**
* 登陆信息验证类
*/
export default class UserService {
  constructor($http,$q) {
    this.$http = $http;
    this.$q= $q;
  }

 /**
 * 注册用户
 */
  register(params){
    return this.$http({
      method:'POST',
      url:'/api/account/register',
      data:params
    });
  }

  /**
  * 获取Token
  * params { account ,password }
  */
  token(params){
    return this.$http({
      method:'POST',
      url:'/api/account/token',
      data:params
    });
  }

  /**
   * 获取当前登录用户的信息
   * @return {[type]} [用户信息]
   */
  get(){
    return this.$http({
      method:'GET',
      url:'/api/User/getUser'
    });
  }

  /**
  * 获取Token
  * params { account ,password }
  */
  check(params){

    let defered = this.$q.defer();
    this.$http({
      method:'POST',
      url:'/api/account/checkaccount',
      data:params
    }).then((response)=>{
      delay.resolve(response);
    },(err)=>{
      defered.reject(err);
    });

    return defered.promise;
  }
}

UserService.$inject=['$http','$q'];
