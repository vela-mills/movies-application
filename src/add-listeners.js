


export function movieRatings() {
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
            console.log('here');
            let selectedMovieRatings = document.getElementsByClassName("movie-rating");

            let movieRatings = Array.from(selectedMovieRatings);
            //console.log(movieRatings);

            let includeMovieRatings = movieRatings.filter(function (checkBox) {
                return (checkBox["checked"] === true);
            });

            includeMovieRatings = includeMovieRatings.map(rating => {
                return rating.value;
            });

            console.log(includeMovieRatings);

            document.getElementById('selectedRating').value = includeMovieRatings;
        })

    }
    ;

}

 export function movieGenre() {


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
     * Add listener to the stars in the Add form.
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
     * Add listener to the stars in the Update form.
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
