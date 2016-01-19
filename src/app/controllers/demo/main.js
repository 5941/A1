export default class MainController {

  constructor(DemoService,$location) {
    this.DemoService = DemoService;
    this.$location=$location;
    this.loading = true;
    this.data = {};
    let {pageNumber,codeOrName} = $location.search();

    this.query = {
      pageSize :10,
      pageNumber:pageNumber||1,
      codeOrName :codeOrName||''
    };

    this.loadData();
  }

  loadData() {
    this.fetchData(this.query);
  }

  go(pageNumber){

    this.query.pageNumber = pageNumber;
    this.$location.search(this.query);
    this.fetchData(this.query);
    return;
  }

  fetchData(params) {
    this.loading=true;
    this.DemoService.findAll(params).then((resp) => {
      let data = resp.data.data || {};
      this.data = {
        items: data.Data || [],
        total: data.TotalRecords || 0,
        page: data.PageNumber || 1
      };
      this.loading = false;
    }, (err) => {
      this.errorMessage = err.data.Message;
      this.loading = false;
    });
  }
}

MainController.$inject = ['DemoService','$location'];
