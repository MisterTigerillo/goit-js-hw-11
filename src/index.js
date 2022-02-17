import './sass/main.scss';
import { Notify } from 'notiflix';
import PicsApiService from './js/pics-service';
import LoadMoreButton from './js/load-more';
import { cardListMarkup } from './js/renderCardList';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
let lightbox = new SimpleLightbox('.gallery a');

const picsApiService = new PicsApiService();
const loadMoreButton = new LoadMoreButton({
  selector: '.load-more',
  hidden: true,
});

form.elements.searchQuery.focus();
form.addEventListener('submit', onFormSubmit);
loadMoreButton.refs.button.addEventListener('click', makeCards);

function onFormSubmit(e) {
  e.preventDefault();

  clearCards();
  picsApiService.query = form.elements.searchQuery.value.trim();
  picsApiService.resetPage();

  loadMoreButton.show();

  makeCards();
}
async function makeCards() {
  try {
    loadMoreButton.disable();
    const cards = await picsApiService.getCards();
    if (cards.length !== 0) {
      renderCards(cards);
      loadMoreButton.enable();
      gallery.children.length <= 40 &&
        Notify.success(`Hooray! We found ${picsApiService.totalCards} images.`);
      checkForEnd();
      return;
    }
    Notify.warning('Sorry, there are no images matching your search query. Please try again.');
  } catch (error) {
    console.log(Notify.info('Please, type your query name.'));
  }
}

function renderCards(cards) {
  gallery.insertAdjacentHTML('beforeend', cardListMarkup(cards));
  lightbox.refresh();
}

function clearCards() {
  gallery.innerHTML = '';
}

function checkForEnd() {
  if (gallery.children.length === picsApiService.totalCards) {
    loadMoreButton.hide();
    Notify.failure("We're sorry, but you've reached the end of search results.");
  }
  if (gallery.children.length > 40) {
    addSmoothScroll();
  }
}

function addSmoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// class PicsApiService -> picsApiService ->   (m) fetchPics   <--- renderCards -> cardListMarkup
