import * as model from '../js/model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import View from './views/View.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 3) load spinner
    recipeView.renderSpinner();

    // 0) Update results to mark selected search
    resultView.update(model.getSearchResultPage());

    // 1) Update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 3) Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err.message);
    recipeView.renderError(); // `${err.message} 💥💥💥`
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 0) Render Spinner
    resultView.renderSpinner();

    // 2) Search recipes
    await model.loadSearchResults(query);

    const { results } = model.state.search;

    // 3) Render searches
    const result = model.getSearchResultPage();
    // console.log(result);
    resultView.render(result);

    // 4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err.message);
    resultView.renderError();
  }
};

const controlPagination = function (goto) {
  // 3) Render NEW searches
  const result = model.getSearchResultPage(goto);
  // console.log(result)
  resultView.render(result);

  // 4) render NEW pagination buttons
  paginationView.render(model.state.search);
};

// controlSearchResults();

const controlServings = function (newServings) {
  // 1) Update the recipe servings(in state)
  model.updateServings(newServings);

  // 2) render UPDATED recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update Bookmark ICON
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe);
    // Show Spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recently created recipe
    recipeView.render(model.state.recipe);

    // Dipslay Success message
    addRecipeView.renderMessage();

    // Render bookmarks view
    bookmarksView.render(model.state.bookmarks);

    // Change the url of page to current id
    history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close upload Window
    setTimeout(function () {
      addRecipeView.windowHandler();
    }, 1000 * MODEL_CLOSE_SEC);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  searchView.reLoadPage();
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
