import {deleteMovie, moveData} from './api';

/**
 *
 * Find the selected ratings
 */

let includeMovieGenre = "";
let includeMovieRatings = "";

export const saveSearchCriteria = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    includeMovieGenre = document.getElementById('selectedGenre').value;
    includeMovieRatings = document.getElementById('selectedRating').value;

}

export function displayMovies(movies) {

    //includeMovieGenre = document.getElementById('selectedGenre').value;
    //includeMovieRatings = document.getElementById('selectedRating').value;
    console.log('includeMovieGenre');
    console.log(includeMovieGenre);
    console.log('includeMovieRatings');
    console.log(includeMovieRatings);

    // build stars

    let html = '';
    let index = 0;
    let idArray = [];

    console.log('display movies');
    console.log(movies);

    movies.forEach(({title, rating, id, urlPoster, genre, movieRated}) => {
        //console.log(urlPoster);

        //let currentGenre = genre;

        // console.log(currentGenre);

        let movieGenres = genre; // currentGenre.split(',');

        let includeMovie = false;


        let movieGenreList = includeMovieGenre.toLowerCase().split(',');
        if (includeMovieGenre.length > 0) {
            movieGenres.forEach(function (item) {
                if (movieGenreList.indexOf(item.toLowerCase().trim()) >= 0) {
                    includeMovie = true;
                }
            })

        } else {
            includeMovie = true;
        }


        if (includeMovie) {
            if (includeMovieRatings.length > 0) {
                if (includeMovieRatings.toLowerCase().indexOf(movieRated.toLowerCase()) < 0) {
                    includeMovie = false;
                }
            }
        }

        // Include the movie
        if (includeMovie) {

            html += ` <div class="col-md-4 card" id="movie${id}">`;
            html += `<div class="card border-0" style="width: 12rem;">`;
            html += `<h5 class="card-title  h3 text-center" > ${title} </h5>`;
            html += `<div card="card-img-top"><img src="${urlPoster}" id="img${id}" style="width: 100%; height: 100%"> </div>`;

            index++;
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
            html += `</div >`;
            idArray.push(id);
        }
    });

    //console.log(html);

    /** Hide  loading gif after page display */
    document.getElementById('loader').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('myDiv').style.display = 'block';

    /**Display movies on screen*/
    document.getElementById('movie-list').innerHTML = html;

    /**Add Event listeners*/

    //delete event listener
    for (let i = 0; i < idArray.length; i++) {
        document.getElementById(`delete${idArray[i]}`).addEventListener('click', event => {
            //alert('Hello');
            //console.log(idArray[i]);
            let elem = document.getElementById(`movie${idArray[i]}`);
            elem.parentNode.removeChild(elem);
            deleteMovie(idArray[i]);
            //displayMovies();
        });
    }

    //update event listener
    for (let i = 0; i < idArray.length; i++) {
        document.getElementById(`update${idArray[i]}`).addEventListener('click', event => {
            //alert('Hello');
            //console.log(event);
            document.getElementById('update-form').style.display = 'block';
            moveData(idArray[i]);
            //displayMovies();
        });
    }
    document.getElementById('loader').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('myDiv').style.display = 'block';
}
