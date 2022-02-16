import './sass/main.scss';
import { Notify } from 'notiflix';
import PicsApiService from './js/pics-service';
import LoadMoreButton from './js/load-more';
import { cardListMarkup } from './js/renderCardList';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');

const picsApiService = new PicsApiService();
const loadMoreButton = new LoadMoreButton({
  selector: '.load-more',
  hidden: false,
});

form.elements.searchQuery.focus();
form.addEventListener('submit', onFormSubmit);
loadMoreButton.refs.button.addEventListener('click', onButtonMoreClick);

function onFormSubmit(e) {
  e.preventDefault();

  loadMoreButton.show();
  loadMoreButton.disable();
  clearCards();
  picsApiService.query = form.elements.searchQuery.value.trim();
  picsApiService.resetPage();
  makeCardPack();
}

async function makeCardPack() {
  try {
    const cards = await picsApiService.getCards();
    if (cards.length !== 0) {
      renderCards(cards);
      loadMoreButton.enable();
      let lightbox = new SimpleLightbox('.gallery a');
      return;
    }
    Notify.warning('Sorry, there are no images matching your search query. Please try again.');
  } catch (error) {
    Notify.info('Please, type your query name.');
  }
}

function onButtonMoreClick() {
  loadMoreButton.disable();
  makeCardPack();
}

function renderCards(cards) {
  gallery.insertAdjacentHTML('beforeend', cardListMarkup(cards));
}

function clearCards() {
  gallery.innerHTML = '';
}

// class PicsApiService -> picsApiService ->   (m) fetchPics   <--- renderCards -> cardListMarkup
