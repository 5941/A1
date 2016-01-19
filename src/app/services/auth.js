/**
* 登陆信息验证类
*/

const CURRENT_USER='__c__';
export default class AuthService {
  constructor($cookieStore) {
    this.$cookieStore = $cookieStore;
  }

  isAuthenticated() {
    return this.$cookieStore.get(CURRENT_USER);
  }

  setCurrentUser(user){
    this.$cookieStore.put(CURRENT_USER,user);
  }

  getCurrentUser(){
    return this.$cookieStore.get(CURRENT_USER);
  }

  clear(){
      this.$cookieStore.remove(CURRENT_USER);
  }
}

AuthService.$inject=['$cookieStore'];
