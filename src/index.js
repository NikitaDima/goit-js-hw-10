import fetchCountries from './js/fetchCountries.js';
import './css/styles.css';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const ref = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  wrapperInfo: document.querySelector('.country-info'),
};

ref.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  cleanInput();
  const name = e.target.value.trim();
  if (name === '') {
    return;
  }
  fetchCountries(name)
    .then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length === 1) {
        countryFullInfo(response);
      } else {
        countrySearchList(response);
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name.')
    );
  // .finally(() => {});
}

function cleanInput() {
  ref.countryList.innerHTML = '';
  ref.wrapperInfo.innerHTML = '';
}

function countryFullInfo(name) {
  const searchMarkup = name
    .map(({ name, flags, capital, population, languages }) => {
      return `<img 
      src="${flags.svg}" 
      alt="${name}" width = "45" height = "25" />
      <h1>${name}</h1>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${languages.map(el => el.name).join(', ')}</p>`;
    })
    .join('');
  ref.wrapperInfo.innerHTML = searchMarkup;
  ref.countryList.innerHTML = '';
}

function countrySearchList(name) {
  const searchList = name
    .map(({ name, flags }) => {
      return `<li>
    <img src="${flags.svg}" 
    alt="${name}" 
    width = "35" 
    height = "25" />
  <p>${name}</p>
</li>`;
    })
    .join('');

  ref.countryList.innerHTML = searchList;
  ref.wrapperInfo.innerHTML = '';
}
