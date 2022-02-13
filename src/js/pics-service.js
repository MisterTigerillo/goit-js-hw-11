import { Notify } from 'notiflix';
import axios from 'axios';

export default class PicsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPics() {
    const options = new URLSearchParams({
      key: '4511618-b12f9cdf2c7c50376431dc814',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });
    const BASE_URL = 'https://pixabay.com/api/';

    if (this.searchQuery !== '') {
      console.log(this);
      return fetch(`${BASE_URL}?${options}`)
        .then(response => response.json())
        .then(data => {
          if (data.hits.length === 0) {
            Notify.warning(
              'Sorry, there are no images matching your search query. Please try again.',
            );
          }
          this.page += 1;
          return data.hits;
        });
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
