export const getMovieInfoOmdbAPI = (title) => {
    /**
     * Fetch the data from the OmdbAPI */
    let newTitle = title.split(' ').join('+');

    return fetch(`http://www.omdbapi.com/?t=${newTitle}?&apikey=63c8d483`)
        .then(response => response.json());
}
