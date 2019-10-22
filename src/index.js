/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies, getMovieList, addMovie, updateMovie} = require('./api');


import {displayMovies, saveSearchCriteria } from './buildHTML';

import  {movieRatings,movieGenre, starsAddForm, starsUpdateForm}  from './add-listeners';
movieRatings();

movieGenre();

starsAddForm();

starsUpdateForm();


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
getMovieList().then( movies => {
    //saveSearchCriteria('click');
    displayMovies(movies)
});


/**Add event listener for the add button*/

document.getElementById("add-movie").addEventListener('click', event => {
    addMovie(event);
    getMovieList();
});

/**Add event listener for the update button*/

document.getElementById("update-movie").addEventListener('click', event => {
    updateMovie(event);
    getMovieList();
});

/**Add event listener for the search button*/

document.getElementById("search-movie").addEventListener('click', event => {
    saveSearchCriteria(event);
     getMovieList().then( movies => {
       displayMovies(movies)
    });

});
