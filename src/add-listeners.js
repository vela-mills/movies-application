import {addMovie, updateMovie, getMovieList} from './api';

import { displayMovies, saveSearchCriteria} from './buildHTML';

export function selectMovieRatings() {
    /**
     *  Movie rating
     *
     * */

    const movieRatingElements = document.getElementsByClassName('movie-rating');

    for (let element of movieRatingElements) {
        //console.log(element.id);
        document.getElementById(element.id).addEventListener('click', function () {
            /**
             *
             * Find the selected ratings
             */
            //console.log('here');
            let selectedMovieRatings = document.getElementsByClassName("movie-rating");

            let movieRatings = Array.from(selectedMovieRatings);
            //console.log(movieRatings);

            let includeMovieRatings = movieRatings.filter(function (checkBox) {
                return (checkBox["checked"] === true);
            });

            includeMovieRatings = includeMovieRatings.map(rating => {
                return rating.value;
            });

            //console.log(includeMovieRatings);

            document.getElementById('selectedRating').value = includeMovieRatings;
        })

    }
    ;

}

export function selectMovieGenre() {


    /**
     *  Movie genre
     *
     * */
    const movieGenreElements = document.getElementsByClassName('genre');

    for (let element of movieGenreElements) {
        //console.log(element.id);
        document.getElementById(element.id).addEventListener('click', function () {

            /**
             *
             * Find the selected genre
             */

            let selectedMovieGenre = document.getElementsByClassName("genre");

            let movieGenre = Array.from(selectedMovieGenre);

            let includeMovieGenre = movieGenre.filter(function (checkBox) {
                return (checkBox["checked"] === true);
            });

            includeMovieGenre = includeMovieGenre.map(rating => {
                return rating.value;
            });

            console.log(includeMovieGenre);

            document.getElementById('selectedGenre').value = includeMovieGenre;

        });
    }
    ;
};

export function starsAddForm() {
    /**
     *
     *
     * stars in the Add form.
     */

    for (let i = 1; i <= 5; i++) {
        document.getElementById("star" + i).addEventListener("click", function () {
            // console.log(ths);
            //console.log(this);
            var lastStar = this.id.replace("star", "");
            for (var i = 1; i <= 5; i++) {
                var cur = document.getElementById("star" + i)
                cur.className = "fa fa-star"
            }
            for (var i = 1; i <= lastStar; i++) {
                var cur = document.getElementById("star" + i)
                if (cur.className == "fa fa-star") {
                    cur.className = "fa fa-star checked"
                }
            }
            document.getElementById('rating').value = lastStar;
        });
    }
    ;
}

export function starsUpdateForm() {

    /**
     *
     *
     * stars in the Update form.
     */

    for (let i = 1; i <= 5; i++) {
        document.getElementById("update-star" + i).addEventListener("click", function () {
            // console.log(ths);
            //console.log(this);
            var lastStar = this.id.replace("update-star", "");
            for (var i = 1; i <= 5; i++) {
                var cur = document.getElementById("update-star" + i)
                cur.className = "fa fa-star"
            }
            for (var i = 1; i <= lastStar; i++) {
                var cur = document.getElementById("update-star" + i)
                if (cur.className == "fa fa-star") {
                    cur.className = "fa fa-star checked"
                }
            }
            document.getElementById('new-rating').value = lastStar;
        });
    }
}

/** add button*/

document.getElementById("add-movie").addEventListener('click', event => {
    addMovie(event);
});

/** update button*/

document.getElementById("update-movie").addEventListener('click', event => {
    updateMovie(event);
    //getMovieList();
});

/** search button*/

document.getElementById("search-movie").addEventListener('click', event => {
    saveSearchCriteria(event);
    getMovieList().then(movies => {
        displayMovies(movies)
    });

});

document.getElementById("doNotDeleteMovie").addEventListener('click', event => {
    event.preventDefault();
   // alert('Do not delete');
    document.getElementById('deleteMovie').innerText = "false";
    $('#myModal').modal('toggle');
   // $("#myModal").modal();
});

document.getElementById("deleteThisMovie").addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('deleteMovie').innerText = "true";
    $('#myModal').modal('toggle');
    //alert('delete');
   // $("#myModal").modal();
});

