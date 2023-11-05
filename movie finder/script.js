// Get references to the DOM elements we need.
const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');

// Define the API URL and image path.
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${"API_KEY"}&query=`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

// Define a function to get movies from the API.
async function getMovies(searchTerm) {
  // Try to fetch the movie data from the API.
  try {
    // Make a fetch request to the API with the search term.
    const res = await fetch(API_URL + searchTerm);

    // Parse the JSON response.
    const data = await res.json();

    // Show the movies in the movie container.
    showMovies(data.results);
  } catch (err) {
    // Log any errors to the console.
    console.error(err);
  }
}

// Define a function to show movies in the movie container.
function showMovies(movies) {
  // Clear the movie container.
  movieContainer.innerHTML = '';

  // If there are no movies, show a no-movies message.
  if (movies.length === 0) {
    movieContainer.innerHTML = `
      <div class="no-movies">
      <i class="fa fa-film" aria-hidden="true"></i>
        <h2>No movies found</h2>
      </div>
    `;
  } else {
    // Iterate over the movies and create a movie element for each one.
    movies.forEach((movie) => {
      // Get the movie's title, poster path, vote average, and overview.
      const { title, poster_path, vote_average, overview } = movie;

      // Create a new movie element.
      const movieEl = document.createElement('div');

      // Add the movie class to the movie element.
      movieEl.classList.add('movie');

      // Set the movie element's inner HTML to the movie's information.
      movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(1)}</span>
        </div>
        <div class="overview">
          <h4>Overview:</h4>
          ${overview}
        </div>
      `;

      // Append the movie element to the movie container.
      movieContainer.appendChild(movieEl);
    });
  }
}

// Define a function to get the CSS class for a movie rating.
function getClassByRate(vote) {
  // If the vote average is greater than or equal to 8, return the green CSS class.
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    // If the vote average is greater than or equal to 5, return the orange CSS class.
    return 'orange';
  } else {
    // Otherwise, return the red CSS class.
    return 'red';
  }
}

// Add an event listener to the search form so that we can get movies when the user submits the form.
form.addEventListener('submit', (e) => {
  // Prevent the default form submit behavior.
  e.preventDefault();

  // Get the search term from the search input field.
  const searchTerm = searchInput.value;

  // If the search term is empty, reload the page.
  if (searchTerm.trim() === '') {
    window.location.reload();
  } else {
    // Otherwise, get the movies for the search term.
    getMovies(searchTerm);

    // Clear the search input field.
    searchInput.value = '';
  }
});
