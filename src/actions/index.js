// ACTION TYPE
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const REMOVE_FROM_FAVOURITE = "REMOVE_FROM_FAVOURITE";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";

// ACTION CREATOR
export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies: movies,
  };
}

export function addFavourite(movie) {
  return {
    type: ADD_TO_FAVOURITE,
    movie: movie,
  };
}

export function removeFromFavourite(movie) {
  return {
    type: REMOVE_FROM_FAVOURITE,
    movie: movie,
  };
}

export function setShowFavourites(val) {
  return {
    type: SET_SHOW_FAVOURITES,
    val: val,
  };
}

export function addMovieToList(movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie: movie,
  };
}

export function handleMovieSearch(movie) {
  const url = `http://www.omdbapi.com/?t=${movie}&apikey=ef5b81e0`;

  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log("movie ", movie);

        // DISPATCH AN ACTION
        dispatch(addMovieSearchResult(movie));
      });
  };
}

export function addMovieSearchResult(movie) {
  return {
    type: ADD_SEARCH_RESULT,
    movie: movie,
  };
}
