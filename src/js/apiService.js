// import { error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';


const API_KEY = '19013398-a980467a71ce13bd0d53bc132';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
    
fetchImages() {
  return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
    .then(response => response.json())
    .then(images => {

      // if (images.length === 0) {
      //   console.log('Show messege');
      //   return;
      // }

      this.incrementPage();
      return images.hits;
    })
  }

  incrementPage() {
    this.page += 1;
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

// function noResult() {
//     error({
//         text: "No Result!",
//         delay: 3000,
//     });
// }