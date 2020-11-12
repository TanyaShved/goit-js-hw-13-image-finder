import NewsApiService from './apiService.js';
import imageEl from '../templates/photo-cards.hbs';
import LoadMoreBtn from './load-more-btn';

import { alert, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import openModal from './modal';

const refs = {
    searchForm: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit',onSearch);  
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.imagesContainer.addEventListener('click', openModal);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;
  try {
    if (newsApiService.query === '') {
      clearImagesContainer();
      loadMoreBtn.hide();
      return enterSomthing();
    }

    loadMoreBtn.show();
    newsApiService.resetPage();
    clearImagesContainer();
    fetchImages();
  } catch (error) {
    console.log("Ошибка!")
  }
}

async function onLoadMore() {
  try {
    const response = await newsApiService.fetchImages();
  const appendImages = appendImagesMarkup(response);
  const scrolling = scrollingPage(appendImages);
    return scrolling;
  }catch (error) {
    console.log("Ошибка!")
  }
}

async function fetchImages() {
  try {
    loadMoreBtn.disable();
  const response = await newsApiService.fetchImages();
  const appendImages = appendImagesMarkup(response);
    const mistake = searchError(appendImages);
    loadMoreBtn.enable();
    return mistake;
  } catch (error) {
    console.log("Ошибка!")
  }
  
}

function appendImagesMarkup(images) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imageEl(images));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

function scrollingPage() {
    window.scrollTo({
        top: refs.imagesContainer.offsetHeight,
        left: 0,
        behavior: 'smooth',
    });
}

function enterSomthing() {
    alert({
        text: "Enter something normal!'",
        delay: 3000,
    });
}

function noResult() {
    error({
        text: "No Result!",
        delay: 1000,
    });
}

function searchError() {
    if (refs.imagesContainer.children.length === 0) {
        noResult();
      loadMoreBtn.hide();
    }
}
    

// Промисы

// import NewsApiService from './apiService.js';
// import imageEl from '../templates/photo-cards.hbs';
// import LoadMoreBtn from './load-more-btn';

// import { alert, error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

// import openModal from './modal';

// const refs = {
//     searchForm: document.querySelector('.search-form'),
//     imagesContainer: document.querySelector('.gallery'),
//     loadMoreBtn: document.querySelector('[data-action="load-more"]'),
// };

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

// const newsApiService = new NewsApiService();

// refs.searchForm.addEventListener('submit',onSearch);  
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
// refs.imagesContainer.addEventListener('click', openModal);

// function onSearch(e) {
//   e.preventDefault();

//   newsApiService.query = e.currentTarget.elements.query.value;

//   if (newsApiService.query === '') {
//     clearImagesContainer();
//     loadMoreBtn.hide();
//     return enterSomthing();
//   }

//   loadMoreBtn.show();
//   newsApiService.resetPage();
//   clearImagesContainer();
//   fetchImages();
// }

// function onLoadMore() {
//   newsApiService.fetchImages().then(appendImagesMarkup).then(scrollingPage);
// }

// function fetchImages() {
//   loadMoreBtn.disable();

//   newsApiService.fetchImages().then(appendImagesMarkup).then(searchError);

//   loadMoreBtn.enable();
// }

// function appendImagesMarkup(images) {
//   refs.imagesContainer.insertAdjacentHTML('beforeend', imageEl(images));
// }

// function clearImagesContainer() {
//   refs.imagesContainer.innerHTML = '';
// }

// function scrollingPage() {
//     window.scrollTo({
//         top: refs.imagesContainer.offsetHeight,
//         left: 0,
//         behavior: 'smooth',
//     });
// }

// function enterSomthing() {
//     alert({
//         text: "Enter something normal!'",
//         delay: 3000,
//     });
// }

// function noResult() {
//     error({
//         text: "No Result!",
//         delay: 1000,
//     });
// }

// function searchError() {
//     if (refs.imagesContainer.children.length === 0) {
//         noResult();
//       loadMoreBtn.hide();
//     }
// }
    