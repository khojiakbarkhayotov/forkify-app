import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      //   e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      //   console.log(btn);
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    this._curPage = this._data.page;
    // console.log(numPages);
    console.log();
    // 1 page, there are other pages
    if (this._curPage === 1 && numPages > 1) {
      return this._generateMarkupButton().next;
    }
    // 1 page, there are NO other pages
    if (numPages === 1) return ``;
    // Last page
    if (this._curPage === numPages) {
      return this._generateMarkupButton().prev;
    }
    // other page
    return (
      this._generateMarkupButton().prev + this._generateMarkupButton().next
    );
  }

  _generateMarkupButton(page) {
    const res = {
      next: `
        <button data-goto="${
          this._curPage + 1
        }" class="btn--inline pagination__btn--next">
                <span>Page ${this._curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
        </button>
        `,
      prev: `
        <button data-goto="${
          this._curPage - 1
        }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                <span>Page ${this._curPage - 1}</span>
        </button>
        `,
    };
    return res;
  }
}

export default new PaginationView();
