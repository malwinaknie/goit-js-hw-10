import axios from "axios";
axios.defaults.headers.common["x-api-key"] = 
"live_5eKOKLAMjaP9dsN7Pk7ejrEVLFqCOonoZS4KQJR2iU92yMe6uRiMLxH7jS5EPh1r";

function fetchBreeds() {
    return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw new error('Oops! Something went wrong!');
    })
};

function fetchCatByBreed(breedId) {
    return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw new error('Oops! Something went wrong!');
    })
}

export {fetchBreeds, fetchCatByBreed};