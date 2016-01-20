/**
 * Created by linxy on 2016/1/19.
 */
export default class MainController {

  constructor(BookService, $location) {
    this.BookService = BookService;
    this.$location = $location;
    this.loading = true;
    this.data = {};
    let {pageNumber,codeOrName} = $location.search();

    this.query = {
      pageSize: 10,
      pageNumber: pageNumber || 1,
      Name: codeOrName || ''
    };

    this.loadData();
  }

  loadData() {
    this.fetchData(this.query);
  }

  go(pageNumber) {

    this.query.pageNumber = pageNumber;
    this.$location.search(this.query);
    this.fetchData(this.query);
    return;
  }

  fetchData(params) {
    this.loading = true;

    this.BookService.findAll(params).then((resp) => {
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

MainController.$inject = ['BookService', '$location'];

