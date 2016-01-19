export default LoadingDirective;

function LoadingDirective() {
  return {
    restrict: 'E',
    template:`
      <div class="loader"></div>
    `
  }
}
