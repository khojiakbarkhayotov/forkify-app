import icons from 'url:../../img/icons.svg'; // parcel 2

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g.recipe)
   * @param {boolean} [render: true] If false, create markup string instead of rendering it to the DOM
   * @returns {undefined | string} A markup string will return if render=false
   * @this {Object} View instance
   * @author Khayotov Khojiakbar
   * @todo Finish implementation
   */
  render(data, render = true) {
    // throw error if result is empty
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    // get delete of the content of recipe container
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Update the DOM elements with received object
   * @param {Object | Object[]} data The data to be updated (e.g.recipe)
   * @returns {undefined}
   * @this {Object} View instance
   * @author Khayotov Khojiakbar
   */
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0)) {
    //   return this.renderError();
    // }

    this._data = data;
    // get delete of the content of recipe container
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  /**
   * The method to render error message to the DOM
   * @param {string | Error} message The message to show on the DOM in case of occuring some errors in app
   * @returns {undefined}
   * @author Khayotov Khojiakbar
   */
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
              <p>${message}</p>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * The method to render success message to the DOM
   * @param {string} message The message to show on the DOM
   * @returns {undefined}
   * @author Khayotov Khojiakbar
   */
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
              <p>${message}</p>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * The method to render spinner for some time, until asynchronous code is doing his job
   * @returns {undefined}
   * @author Khayotov Khojiakbar
   */
  renderSpinner() {
    const markup = `
        <div class="spinner">
              <svg>
                  <use href="${icons}#icon-loader"></use>
              </svg>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Private method to clear the content of element in the DOM
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
