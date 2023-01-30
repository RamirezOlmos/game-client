export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SEARCH_GAME_BY_NAME = 'SEARCH_GAME_BY_NAME';
export const GET_GAME_BY_ID = 'GET_GAME_BY_ID';
export const GET_GENRES = 'GET_GENRES';
export const CREATED_GAME = 'CREATED_GAME';
export const RESET = 'RESET';
export const FILTER_GAME_BY_GENRE = 'FILTER_GAME_BY_GENRE';
export const ORDER_ASC_NAME = 'ORDER_GAMES_ASC';
export const ORDER_DESC_NAME = 'ORDER_GAMES_DESC';
export const FILTER_GAME_BY_SOURCE = 'FILTER_GAME_BY_SOURCE';


export const getVideogames = () => {
  return function(dispatch) {
    fetch('http://localhost:3001/videogames')
      .then((response) => response.json())
      .then((data) => dispatch(
        { type: GET_VIDEOGAMES, payload: data }))
      .catch((error) => {
          dispatch({type: GET_VIDEOGAMES, 
            payload: error.message})
      });
  };
};

export const searchGameByName = (name) => {
  return function(dispatch) {
    fetch(`http://localhost:3001/videogames?name=${name}`)
      .then((response) => response.json())
      .then((data) => dispatch(
        { type: SEARCH_GAME_BY_NAME, payload: data }))
      .catch((error) => {
          dispatch({type: SEARCH_GAME_BY_NAME, 
            payload: error.message})
      });
  };
};

export const getGameById = (id) => {
  return function(dispatch) {
    fetch(`http://localhost:3001/videogames/${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(
        { type: GET_GAME_BY_ID, payload: data }))
      .catch((error) => {
          dispatch({type: GET_GAME_BY_ID, 
            payload: error.message})
      });
  };
};

export const getGenres = () => {
  return function(dispatch) {
    fetch(`http://localhost:3001/genres`)
      .then((response) => response.json())
      .then((data) => dispatch(
        { type: GET_GENRES, payload: data }))
      .catch((error) => {
          dispatch({type: GET_GENRES, 
            payload: error.message})
      });
  };
};

export const createGame = (game) => {
  return function(dispatch) {
    fetch(`http://localhost:3001/videogames`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game),
    })
    .then((response) => response.json())
    .then((data) => dispatch(
      { type: CREATED_GAME, payload: data }))
    .catch((error) => {
        dispatch({type: CREATED_GAME, 
          payload: error.message})
    });
  };
};

export const resetAll = () => {
  return function(dispatch) {
    dispatch({
      type: RESET
    });
  };
};

export const filterByGenre = (genres) => {
  return {type: FILTER_GAME_BY_GENRE, payload: genres}
};

export const orderAsc = (type) =>
  (dispatch, getState) => {
    let filtered;
    if(getState().filteredVideogames != ''){
      filtered = getState().filteredVideogames;
    }
    else{
      filtered = getState().videogames;
    }
    let videogamesOrder = [];

    if (type === 'asc_name') {
      videogamesOrder = filtered.sort(
        (a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });
    }
    if (type === 'asc_rating') {
      videogamesOrder = filtered.sort(
        (a, b) => a.rating - b.rating);
    }
    dispatch({
      type: ORDER_ASC_NAME,
      payload: {
        videogamesOrder,
        name: type
      }
    });
  };

export const orderDesc = (type) =>
  (dispatch, getState) => {
    let filtered;
    if(getState().filteredVideogames != ''){
      filtered = getState().filteredVideogames;
    }
    else{
      filtered = getState().videogames;
    }
    let videogamesOrder = [];

    if (type === 'desc_name') {
      videogamesOrder = filtered.sort(
        (a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          return 0;
        });
    }
    if (type === 'desc_rating') {
      videogamesOrder = filtered.sort(
        (a, b) => b.rating - a.rating);
    }
    dispatch({
      type: ORDER_DESC_NAME,
      payload: {
        videogamesOrder,
        name: type
      }
    });
  };

export const filterBySource = (source) =>
  (dispatch, getState) => {
    const filterGames = getState().videogames.filter(
      (game) => game.source === source);

    dispatch({
      type: FILTER_GAME_BY_SOURCE,
      payload: {
        filterGames,
        source
      }
    });
  };

