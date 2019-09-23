/**Retrieve movies from /api/movies (db.json) set-up in server.js*/


const getMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json());
};


function displaySpinner() {
    document.getElementById('loader').style.display = 'block';
    // document.getElementById('loading').style.display = 'none';
    document.getElementById('myDiv').style.display = 'none';
}

function clearAddMovie() {
    // Clear the add movie
    document.getElementById('movie-name').value = '';
    // Clear the rating
    for (let i = 1; i <= 5; i++) {
        let cur = document.getElementById("star" + i)
        cur.className = "fa fa-star";
    }
}

const getMovieInfo = (title) => {
    /**
     * Find url */
    console.log(title);
    let newTitle = title.split(' ').join('+');
    console.log(newTitle);

    return fetch(`http://www.omdbapi.com/?t=${newTitle}?&apikey=63c8d483`)
        .then(response => response.json());
}

/**
 * Add a movie to the database
 * */

const addMovie = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    // Display the loader
    displaySpinner();
    let rating = document.getElementById('rating').value;
    // rating = 10;
    let title = document.getElementById('movie-name').value.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    // Get the last id
    console.log(`Add movie title ${title} rating ${rating}`);
    clearAddMovie();
    let id = 0;
    fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            //console.log(movies);
            return movies.map(function (movie) {
                return movie.id;
            });
        })
        .then(idArray => {
            //console.log(idArray);

            id = idArray.sort()[idArray.length - 1];
            //console.log(id);

        });

    let urlPoster = "";
    let movieRated = "";
    let currentGenre = "";
    let year = "";
    getMovieInfo(title).then((data) => {
        console.log(data);
        urlPoster = data["Poster"];
        movieRated = data["Rated"];
        currentGenre = data["Genre"];
        year = data["Year"];

        let genre = currentGenre.split(",");
        let title = data["Title"];

        console.log(urlPoster);
        console.log(movieRated);
        console.log(currentGenre);
        console.log(year)
        // Create the new movie object
        const newMovie = {
            id,
            title,
            rating,
            movieRated,
            genre,
            year,
            urlPoster
        };
        //console.log(newMovie);
        // Add the new movie to the array

        const url = '/api/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        };
        fetch(url, options)
            .then(/* post was created successfully */)
            .catch(/* handle errors */);
    })
        .catch(console.log('error'));


};

/**
 * Delete movie
 *
 **/

const deleteMovie = (id) => {
    // e.preventDefault(); // don't submit the form, we just want to update the data

    // Clear the add movie
    clearAddMovie()
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // update database
    fetch(`/api/movies/${id}`, options)
        .then(() => {
            console.log(`movie ${id} deleted`)
        })
        .catch(() => {
            console.log('error on delete')
        });

};

/**Update Movie */


//Step 1 Move data from display to update form
const moveData = (id) => {

    return fetch(`/api/movies/${id}`)
        .then(response => response.json())
        .then(movie => {
            //console.log(movie);
            let {title, rating, id} = movie;
            //console.log(title);
            document.getElementById("new-name").value = title;
            document.getElementById("new-rating").value = rating;
            document.getElementById("updateMovieID").value = id;

            //changes stars to black
            for (let i = 1; i <= 5; i++) {
                let cur = document.getElementById("update-star" + i)
                cur.className = "fa fa-star"
            }
            //change stars to orange
            for (let i = 1; i <= rating; i++) {
                let cur = document.getElementById("update-star" + i)
                if (cur.className == "fa fa-star") {
                    cur.className = "fa fa-star checked"
                }
            }
        });
};

//Step 2 update movie in database
const updateMovie = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let rating = document.getElementById('new-rating').value;
    let title = document.getElementById('new-name').value.trim();
    let id = document.getElementById("updateMovieID").value;
    clearAddMovie();
   // console.log(rating);
    /** Hide  loading gif after page display */
    //displaySpinner();


    //Hide Update movie
    document.getElementById('update-form').style.display = 'none';

    let urlPoster = "";
    let movieRated = "";
    let currentGenre = "";
    let year = "";
    getMovieInfo(title).then((data) => {
        console.log(data);
        urlPoster = data["Poster"];
        movieRated = data["Rated"];
        currentGenre = data["Genre"];
        year = data["Year"];
        document.getElementById(`img${id}`).setAttribute("src", urlPoster);

        // Update the star rating
        let starHTML = "";

        for (let i = 0; i < rating; i++) {
            starHTML += `<span class="fa fa-star checked"></span>`;
        }
        for (let i = rating; i < 5; i++) {
            starHTML += `<span class="fa fa-star"></span>`;
        }

        document.getElementById(`dStar${id}`).innerHTML = starHTML;
        let genre = "";
        if (typeof genre != "undefined") genre = currentGenre.split(",");
        let title = data["Title"];

        const updateMovie = {
            id,
            title,
            rating,
            movieRated,
            genre,
            year,
            urlPoster
        };
        // Add the new movie to the array


        const url = `/api/movies/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateMovie),
        };
        fetch(url, options)
            .then(/* post was created successfully */)
            .catch(/* handle errors */);
    });

}
/**
 *
 * Display movies
 */

const getMovieList = () => {
   // let idArray = [];
    return fetch('/api/movies')
        .then(response => response.json())
        .catch("Error move ")
    // .then(movies => {
    //
    // )
};


/** Export functions to index.js */
module.exports = {getMovies, addMovie, deleteMovie, updateMovie, getMovieList, moveData};
//module.exports = {deleteMovie, moveData}