/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies, displayMovies, addMovie, updateMovie} = require('./api');

/**Displays all movies in the console */

getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    });
}).catch(() => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
});

/**Display movies on the screen*/
displayMovies();

/**Add event listener for the add button*/

document.getElementById("add-movie").addEventListener('click', event => {
    addMovie(event);
    displayMovies();
});

/**Add event listener for the update button*/

document.getElementById("update-movie").addEventListener('click', event => {
    updateMovie(event);
    displayMovies();
});



