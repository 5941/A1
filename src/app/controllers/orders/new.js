import _ from 'lodash';
import city from './citydata'

export default class NewController {

  constructor($state, $scope, OrderService) {
    this.$state = $state;
    this.$scope = $scope;
    this.OrderService = OrderService;

    //获取当前的Id
    this.id = $state.params.id;
    this.data = {};
    this.loading = false;
    this.show = true;
    this.formData = {
      Code: 'S' + (new Date().getTime()),
      Details: [],
      Address: {
        "Country": "中国",
        "Province": "北京市",
        "City": "东城区",
        "District": "",
        "Street": "",
        "ZipCode": "100070"
      }
    };
    this.provinces = city;
    this.cities = [];

    this.changeProvince('北京市');

    this.selectedItems = [];
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
      total = total + ((item.UnitPrice) * (~~item.Quantity));
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

    this.OrderService.save(this.formData)
      .then((resp) => {

        if (resp.data.status != 200) {
          this.errorMessage = resp.data.message;
          return;
        }
        this.successMessage = '订单创建成功!';
      }, (err) => {
        this.errorMessage = err.data.Message;
      });
  }

  goback() {
    history.back();
  }
}

NewController.$inject = ['$state', '$scope', 'OrderService'];
