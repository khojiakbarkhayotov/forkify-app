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
        location.replace('http://localhost:1234');
        // location.reload();
      });
  }
}
export default new SearchView();
