import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const ref = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};

ref.searchInput.addEventListener('input', () => {
  console.log(ref.searchInput.value);
});
