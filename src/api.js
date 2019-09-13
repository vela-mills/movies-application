/**Retrieve movies from /api/movies (db.json) set-up in server.js*/

const getMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json());
};

/**
 * Add a movie to the database
 * */

const addMovie = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let rating = document.getElementById('rating').value;
    let title = document.getElementById('movie-name').value;

    // Get the last id
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

    // Create the new movie object
    const newMovie = {
        title,
        rating,
        id
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


};

/**
 * Delete movie
 *
 */

const deleteMovie = (id) => {
    // e.preventDefault(); // don't submit the form, we just want to update the data
    //console.log(id);
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
            console.log(movie);
            let {title, rating, id} = movie;
            console.log(title);
            document.getElementById("new-name").value = title;
            document.getElementById("new-rating").value = rating;
            document.getElementById("updateMovieID").value = id;

        });
};

//Step 2 update movie in database
const updateMovie = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let rating = document.getElementById('new-rating').value;
    let title = document.getElementById('new-name').value;
    let id = document.getElementById("updateMovieID").value;

    // Create the new movie object
    const updateMovie = {
        title,
        rating,
        id
    };
    //console.log(updateMovie);
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
};


/**Dynamically build html*/


const displayMovies = () => {
    let idArray = [];
    return fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            // build stars

            let html = '';
            movies.forEach(({title, rating, id}) => {
                html += ` <div class="col-md-4">`;
                html += `<div class="card" style="width: 12rem;">`;
                html += `<h5 class="card-title" > ${title} </h5>`;
                html += `<div card="card-body">Img </div>`;
                let starHTML = "<h2>Star Rating</h2>";

                for (let i = 0; i < rating; i++) {
                    starHTML += `<span class="fa fa-star checked"></span>`;
                }
                for (let i = rating; i < 5; i++) {
                    starHTML += `<span class="fa fa-star"></span>`;
                }
                //starHTML +=          <span class="fa fa-star"></span>
                //console.log(starHTML);
                html += ` <div class="card-footer"> ${starHTML} </div>`;
                html += `</div>`;
                html += `<div class="row">`;
                html += `<div class="col-md-6"><button class="delete-movie btn btn-success btn-lg btn-block" id="delete${id}">Delete</button></div>`;
                html += `<div class="col-md-6"><button class="delete-movie btn btn-success btn-lg btn-block" id="update${id}">Update</button></div>`;
                html += `</div></div > `;
                idArray.push(id);
            });
            // console.log(html);

            /**Display movies on screen*/
            document.getElementById('movie-list').innerHTML = html;

            /** Hide  loading gif after page display */
            document.getElementById('loading').style.display = 'none';

            /**Add Event listeners*/

            //delete event listener
            for (let i = 0; i < idArray.length; i++) {
                document.getElementById(`delete${idArray[i]}`).addEventListener('click', event => {
                    //alert('Hello');
                    console.log(idArray[i]);
                    deleteMovie(idArray[i]);
                    displayMovies();
                });
            }

            //update event listener
            for (let i = 0; i < idArray.length; i++) {
                document.getElementById(`update${idArray[i]}`).addEventListener('click', event => {
                    //alert('Hello');
                    //console.log(event);
                    moveData(idArray[i]);
                    displayMovies();
                });
            }
        })
};

/** Export functions to index.js */
module.exports = {getMovies, addMovie, deleteMovie, updateMovie, displayMovies, moveData};