import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const options = new URLSearchParams({
  key: '4511618-b12f9cdf2c7c50376431dc814',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export default class PicsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getCards() {
    if (this.searchQuery !== '') {
      const parsedData = await axios.get(
        `${BASE_URL}?q=${this.searchQuery}&page=${this.page}&${options}`,
      );
      this.totalCards = parsedData.data.totalHits;
      this.page += 1;
      return parsedData.data.hits;
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
