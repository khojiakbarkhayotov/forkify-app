import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfuly uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    // this._addHandlerUpload();
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.windowHandler.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.windowHandler.bind(this));
    this._overlay.addEventListener('click', this.windowHandler.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      //   console.log(data);
      handler(data);
    });
  }

  windowHandler() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
