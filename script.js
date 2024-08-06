const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/tv?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=';
let currentURL = BASE_API + API_KEY + '&page=1';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const home = document.getElementById('home');
const forward = document.getElementById('forward');
const backward = document.getElementById('backward');



getMovies(currentURL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
    console.log(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { name, title, poster_path, vote_average, overview } = movie;
        const finalTitle = title || name;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${finalTitle}" width="280px">
            <div class="movie-info">
                <h3>${finalTitle}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average.toString().substring(0, 3)}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
    forward.style.display = 'none'
    backward.style.display = 'none'
});

forward.addEventListener('click', (e) => {
    e.preventDefault();
    let currentPAGE = currentURL.slice(currentURL.lastIndexOf('=') + 1);
    currentPAGE = Number(currentPAGE);
    currentPAGE++;
    currentURL = currentURL.slice(0, currentURL.lastIndexOf('=') + 1) + currentPAGE;
    console.log(currentURL);
    getMovies(currentURL);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


backward.addEventListener('click', (e) => {
    e.preventDefault();
    let currentPAGE = currentURL.slice(currentURL.lastIndexOf('=') + 1);
    currentPAGE = Number(currentPAGE);
    if (currentPAGE > 1) {
        currentPAGE--;
        currentURL = currentURL.slice(0, currentURL.lastIndexOf('=') + 1) + currentPAGE;
        console.log(currentURL);
        getMovies(currentURL);
    }
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

home.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
})