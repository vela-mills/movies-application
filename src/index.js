/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */


const {getMovies} = require('./api.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch(() => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
});

const {displayMovies} = require('./api.js');
displayMovies();
//$('#movie-list').val(displayMovies);

const {addMovie} = require('./api.js');

document.getElementById("add-movie").addEventListener('click', event => {
  addMovie(event);
  displayMovies();
});


const {updateMovie} = require('./api.js');
document.getElementById("update-movie").addEventListener('click', event => {
  updateMovie(event);
  displayMovies();
});



