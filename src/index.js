import './sass/main.scss';
import PicsApiService from './js/pics-service';
import { cardListMarkup } from './js/renderCardList';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
// const searchButton = document.querySelector('button');
const loadMoreButton = document.querySelector('.load-more');

const picsApiService = new PicsApiService();

form.elements.searchQuery.focus();
form.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onButtonMoreClick);

function onFormSubmit(e) {
  e.preventDefault();

  picsApiService.query = form.elements.searchQuery.value.trim();
  picsApiService.resetPage();
  makeCardPack();
}

function onButtonMoreClick() {
  makeCardPack();
}

function makeCardPack() {
  picsApiService.fetchPics().then(cards => {
    renderCards(cards);
    let lightbox = new SimpleLightbox('.gallery a');
  });
}

function renderCards(cards) {
  gallery.insertAdjacentHTML('beforeend', cardListMarkup(cards));
}

// class PicsApiService -> picsApiService ->   (m) fetchPics   <--- renderCards -> cardListMarkup
