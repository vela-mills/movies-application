const getMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json());
}
const addMovie = () => {
    return fetch('/api/movies')
        .then(response => response.json());
}
const deleteMovie = () => {
    return fetch('/api/movies')
        .then(response => response.json());
}
const updateMovie = () => {
    return fetch('/api/movies')
        .then(response => response.json());
}


module.exports = {getMovies, addMovie, deleteMovie, updateMovie};