/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies, displayMovies, addMovie, updateMovie, saveSearchCriteria} = require('./api');

/**Displays all movies in the console */

getMovies().then((movies) => {
   // console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
        //console.log(`id#${id} - ${title} - rating: ${rating}`);
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

/**Add event listener for the search button*/

document.getElementById("search-movie").addEventListener('click', event => {
    //getCurrentSelection(event);
   saveSearchCriteria(event);
    displayMovies();
});

// // //getElementsByClassName returns an array of elements, addEventListener exists on elements.
// //     The fix would be to iterate over the result set from getElementsByClassName and call addEventListener on each item:
//
// let selectedRatings = [];
//
// let ratingsGroup = document.getElementsByClassName('rating');
//
// function saveRatings()
// {
//     console.log(this.value);
//     if (selectedRatings.indexOf(this.value)) {
//         selectedRatings.splice(selectedRatings.indexOf(this.value),1);
//     }else {
//         selectedRatings.push(this.value)  ;
//     }
//     document.getElementById('selectedRating').value = selectedRatings;
//
// };
//
// for (let i = 0; i < ratingsGroup.length; i++) {
//     //console.log(ratingsGroup[i]);
//     ratingsGroup[i].addEventListener("click", saveRatings);
// }

/**
 *
 * Find the selected ratings
 */
//let selectedMovieRatings = document.getElementsByClassName("rating");

//let movieRatings = Array.from(selectedMovieRatings);
//console.log(movieRatings);




