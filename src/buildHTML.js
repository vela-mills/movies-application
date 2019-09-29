import {deleteMovie, moveData, getMovieDB} from './api';
import {removeSpinner} from "./manageDOM";

/**
 *
 * Find the selected ratings
 */

let includeMovieGenre = "";
let includeMovieRatings = "";


function buildMovieCard(title, rating, id, urlPoster) {
    let html = "";
    html += `<div class="card border-0" style="width: 12rem;">`;
    html += `<h5 class="card-title  h3 text-center" > ${title} </h5>`;
    html += `<div card="card-img-top"><img src="${urlPoster}" id="img${id}" style="width: 100%; height: 100%"> </div>`;

    let starHTML = "";

    for (let i = 0; i < rating; i++) {
        starHTML += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = rating; i < 5; i++) {
        starHTML += `<span class="fa fa-star"></span>`;
    }

    html += ` <div class="card-body text-center pt-0 pb-0 star-size" id="dStar${id}"> ${starHTML} </div>`;
    html += `<div class="row card-body p-0 border-0" style="margin-left: 0px; margin-right: 0px">`;
    html += `<div class="col-md-6 pl-0"><button class=" btn btn-success btn-lg btn-block movie-button " id="update${id}"><i class="fa fa-edit"></i></button></div>`;
    html += `<div class="col-md-6 pr-0"><button class=" btn btn-danger btn-lg btn-block movie-button" id="delete${id}"><i class="fa fa-ban"></i></button></div>`;
    html += `</div>`;
    html += `</div>`;
    return html;
}

function includeThisMovie(movieGenre, movieRated) {
    //
    // console.log(movieGenre);
    // console.log(movieRated);
    let includeMovie = false;

    let movieGenres = movieGenre;

    //console.log(includeMovieGenre);
    if (includeMovieGenre.length > 0) {
        let movieGenreList = includeMovieGenre.toLowerCase().split(',');
        movieGenres.forEach(function (item) {
            if (movieGenreList.indexOf(item.toLowerCase().trim()) >= 0) {
                includeMovie = true;
            }
        })

    } else {
        includeMovie = true;
    }
    //console.log('include movie ' + includeMovie);
    if (includeMovie) {

        if (includeMovieRatings.length > 0) {
            let includeMovieRatingList = includeMovieRatings.toLowerCase().split(',');
            includeMovie = (includeMovieRatingList.toLowerCase().indexOf(movieRated) >= 0);
        } else {
            includeMovie = true;
        }
    }
    //console.log('include movie ' + includeMovie);
    return includeMovie;
}

export const saveSearchCriteria = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    includeMovieGenre = document.getElementById('selectedGenre').value;
    includeMovieRatings = document.getElementById('selectedRating').value;

}

export function displayMovies(movies) {


    // build stars

    let html = '';
    //let index = 0;
    let idArray = [];
    let titleArray = [];

    movies.forEach(({title, rating, id, urlPoster, genre, movieRated}) => {

        /** Display the movies **/
        if (includeThisMovie(genre, movieRated)) {
            html += ` <div class="col-md-4 card" id="movie${id}">`;
            html += buildMovieCard(title, rating, id, urlPoster);
            html += `</div >`;
            idArray.push(id);
            titleArray.push(title);
        }
    });

    /** Hide  loading gif after page display */
    removeSpinner();


    /**Display movies on screen*/
    document.getElementById('movie-list').innerHTML = html;

    /**Add Event listeners for the delete and the update buttons included in the cards */

    for (let i = 0; i < idArray.length; i++) {
        document.getElementById(`delete${idArray[i]}`).addEventListener('click', event => {
            /** Display the delete message */

            //console.log(document.getElementById('myModal'));
            //document.getElementById('myModal').aria-hidden false);
            $("#myModal").modal('toggle');
            document.getElementById("deleteMovieInformation").innerText = "Do you want to delete the movie " + titleArray[i] + "?";
            //document.getElementById('deleteMovie').value == "false";
            $('#myModal').on('shown.bs.modal', function () {
                //document.getElementById("deleteMovieInformation").innerText = "Do you want to delete the movie " + titleArray[i] + "?";
                let deleteThisMovie = (document.getElementById('deleteMovie').value == "true");
                console.log(document.getElementById('deleteMovie').value);
                console.log(deleteThisMovie);
                if (deleteThisMovie) {
                    let elem = document.getElementById(`movie${idArray[i]}`);
                    elem.parentNode.removeChild(elem);
                    deleteMovie(idArray[i]);
                }
            });


        });
    }

    //update event listener
    for (let i = 0; i < idArray.length; i++) {
        document.getElementById(`update${idArray[i]}`).addEventListener('click', event => {
            document.getElementById('update-form').style.display = 'block';
            moveData(idArray[i]);
        });
    }

}


export function displayMovie(movie) {
    //console.log(movie);
    // let movieInfo = getMovieDB(movie);
    let {title, rating, id, urlPoster, genre, movieRated} = movie[0];

    let movieCardHTML = "";
    console.log('Display movie ' + title);

    /**
     *  Movie going to be displayed?
     */

    if (includeThisMovie(genre, movieRated)) {
        /**
         *
         * Update movie or add movie
         */

            //let selectedMovie = document.getElementById(`movie${id}`);

        let element = !!document.getElementById(`movie${id}`);

        /** Update movie **/
        if (element) {
            /**
             *  Update the html
             */
            document.getElementById(`movie${id}`).value = buildMovieCard(title, rating, id, urlPoster);

        } else {
            /**
             * Creat the card for the new movie and add it to the html
             */
            movieCardHTML = ` <div class="col-md-4 card" id="movie${id}">`;
            movieCardHTML += buildMovieCard(title, rating, id, urlPoster);
            movieCardHTML += `</div >`;
            //console.log(movieCardHTML);
            document.getElementById('movie-list').innerHTML += movieCardHTML;


            /**Add Event listeners for the delete and the update buttons included in the cards */

            document.getElementById(`delete${id}`).addEventListener('click', event => {
                $("#myModal").modal();
                document.getElementById("deleteMovieInformation").innerText = "Do you want to delete the movie " + title + "?";

                let deleteThisMovie = (document.getElementById('deleteMovie').value == "true");
               console.log(deleteThisMovie);
                if (deleteThisMovie) {
                    let elem = document.getElementById(`movie${id}`);
                    elem.parentNode.removeChild(elem);
                    deleteMovie(id);
                }
            });

            //update event listener
            document.getElementById(`update${id}`).addEventListener('click', event => {
                document.getElementById('update-form').style.display = 'block';
                moveData(id);
            });
        }


    } else {
        /** Add message at the bottom of the screen**/
    }


}

