import _ from 'lodash';
import city from './citydata';

export default class EditController {

  constructor($state, $scope, OrderService) {
    this.$state = $state;
    this.$scope = $scope;
    this.OrderService = OrderService;

    //获取当前的Id
    this.id = $state.params.id;
    this.data = {};
    this.loading = false;
    this.show = false;
    this.formData = {
      Address:{}
    };
    this.provinces = city;
    this.cities = [];

    this.selectedItems = [];

    //加载用户信息
    this.loadData();
  }

  loadData(){

    this.loading =true;
    this.OrderService.get(this.id)
      .then((resp) => {
        this.loading=false;
        if (resp.data.status != 200) {
          this.errorMessage = resp.data.message;
          return;
        }
        this.formData = resp.data.data;
        this.selectedItems = resp.data.data.Details;

        // 初始化地区设置
        this.changeProvince(this.formData.Address.Province);
        this.changeCity(this.formData.Address.City);

      }, (err) => {
        this.errorMessage = err.data.Message;
      });
  }

  changeCity(name) {
    this.formData.Address.ZipCode = _.find(this.cities,(city)=>{
      return city.name==name;
    }).code;
  }
  changeProvince(name) {

    this.cities = _.result(_.find(this.provinces, function(province) {
      return province.name == name;
    }), 'children');

    this.formData.Address.Province = name;
    this.formData.Address.City = _.first(this.cities).name;
    this.formData.Address.ZipCode = _.first(this.cities).code;
    this.selectedItems = this.formData.Details;
  }

  open() {
    this.show = !this.show;
  }

  reload() {
    this.$state.reload();
  }

  total() {
    var total = 0;
    angular.forEach(this.selectedItems, (item) => {
      total = total + ((item.Price) * (~~item.Quantity));
    });
    this.formData.TotalMoney = total;
    return total;
  }

  remove(index) {
    this.selectedItems.splice(index, 1);
  }

  clear() {
    this.selectedItems = [];
  }

  save() {

    this.loading= true;
    this.errorMessage='';

    //处理Detail
    this.formData.Details = _.map(this.selectedItems, (item) => {
      return {
        ProductID: item.ID,
        Product: item,
        Quantity: item.Quantity,
        Price: item.UnitPrice,
        PID: item.ID,
        Money: item.Quantity * item.UnitPrice
      }
    });

    this.OrderService.update(this.formData)
      .then((resp) => {

        this.loading=false;
        if (resp.data.status != 200) {
          this.errorMessage = resp.data.message;
          return;
        }
        this.successMessage = '订单修改成功!';
      }, (err) => {
        this.loading=false;
        this.errorMessage = err.data.Message;
      });
  }

  goback() {
    history.back();
  }
}

EditController.$inject = ['$state', '$scope', 'OrderService'];
