import './sass/main.scss';
import PicsApiService from './js/pics-service';
import { cardListMarkup } from './js/renderCardList';

const form = document.querySelector('.search-form');
const searchButton = document.querySelector('button');
const loadMoreButton = document.querySelector('.load-more');

const picsApiService = new PicsApiService();

form.addEventListener('submit', onFormSubmit);

loadMoreButton.addEventListener('click', onButtonClick);

function onFormSubmit(e) {
  e.preventDefault();

  picsApiService.query = form.elements.searchQuery.value;

  picsApiService.fetchPics().then(cards => cardListMarkup(cards));
  // .catch(error => console.log(error));
  //   console.log(cardData);
}

function onButtonClick() {
  picsApiService.fetchPics();
}
