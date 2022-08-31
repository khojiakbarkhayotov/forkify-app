class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const searchRes = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return searchRes;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
      // location.replace('http://localhost:1234');
    });
  }

  reLoadPage() {
    document
      .querySelector(`.header__logo`)
      .addEventListener('click', function (e) {
        e.preventDefault();
        const url = document.URL;
        const goto = url.includes('#') ? url.indexOf('#') - 1 : url.length;
        console.log(url.slice(0, goto));
        location.replace(url.slice(0, goto));
        // location.reload();
      });
  }
}
export default new SearchView();
