const getMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json());
}
const addMovie = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let rating = document.getElementById('rating').value;
    let title = document.getElementById('movie-name').value;
    // Get the last id
    //let newId = document.getElementById('lastID').value;
    //newId = parseInt(newId) + 1;
    //document.getElementById('lastID').innerText = newId;
    //let id = newId;
    let id = 0;
    fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            return movies.map(function (movie) {
                return movie.id;
            });
        })
        .then(idArray => {
            //console.log(idArray);

            id = idArray.sort()[idArray.length - 1];

        })
    // Create the new coffee object
    const newMovie = {
        title,
        rating,
        id
    };
    console.log(newMovie);
    // Add the new movie to the array

    //const blogPost = {title: 'Ajax Requests', body: 'Are a fun way to use JS!'};
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

    // displayMovies();

}

const deleteMovie = () => {
    return fetch('/api/movies')
        .then(response => response.json());
}
const updateMovie = () => {
    return fetch('/api/movies')
        .then(response => response.json());
}

const displayMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            let html = '';
            movies.forEach(({title, rating, id}) => {
                html += ` <div class="col-md-4">`;
                html += `<div class="card" style="width: 12rem;">`;
                html += `<h5 class="card-title" > ${title} </h5>`;
                html += `<div card="card-body"> ${rating} </div>`;
                html += ` <div class="card-footer"> Card footer </div>`;
                html += `</div></div>`;
            });
            console.log(html);
            document.getElementById('movie-list').innerHTML = html;
            document.getElementById('loading').style.display = 'none';
            //return html;
        })


}


module.exports = {getMovies, addMovie, deleteMovie, updateMovie, displayMovies};