export default class PicsApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchPics() {
    // console.log(this);
    const options = new URLSearchParams({
      key: '4511618-b12f9cdf2c7c50376431dc814',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    const BASE_URL = 'https://pixabay.com/api/';

    return fetch(`${BASE_URL}?${options}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data.hits);
        return data.hits;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
