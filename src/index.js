import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from "notiflix";
import SlimSelect from "slim-select";

const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.replace('loader', 'hidden');
error.classList.replace('error', 'hidden');

function drawTheInfo(breed) {
    const {url, breeds} = breed;
    const {name, description, temperament} = breeds[0];
    const infoMarkup = `
    <h1 class="name">${name}</h1>
    <p class="descr">${description}</p>
    <p class='temp'>${temperament}</p>
    <img src=${url}>`;
    
    catInfo.innerHTML = infoMarkup;
};

breedSelect.addEventListener('change', onBreedSelect);

function onBreedSelect(e) {
    const selectedBreed = e.currentTarget.value;
    Notiflix.Loading.standard('Loading data, please wait...');

    fetchCatByBreed(selectedBreed)
    .then(breed => {
        drawTheInfo(breed[0]);
        Notiflix.Loading.remove();
    })
    .catch(()=> {
        Notiflix.Notify.remove();
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })
}

    fetchBreeds()
    .then(breeds => {
    const option = breeds
    .map(breed => {
        return `<option value='${breed.id}'>${breed.name}</option>`;
    })
    .join();

    breedSelect.innerHTML = option;
    breedSelect.style.visibility = 'inherit';
    new SlimSelect({
        select: '.breed-select'
    })
        Notiflix.Loading.remove();
    })
    .catch(() => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
        );
    })