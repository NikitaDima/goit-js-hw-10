export default fetchCountries;
import Notiflix from 'notiflix';

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags.svg,languages`
  ).then(response => {
    if (!response.ok) {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name.'
      );
    }
    return response.json();
  });
}
