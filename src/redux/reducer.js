import {
  GET_VIDEOGAMES,
  SEARCH_GAME_BY_NAME,
  GET_GAME_BY_ID,
  GET_GENRES,
  CREATED_GAME,
  RESET,
  FILTER_GAME_BY_GENRE,
  ORDER_ASC_NAME,
  ORDER_DESC_NAME,
  FILTER_GAME_BY_SOURCE,
  ERROR_GET_VIDEOGAMES,
} from './actions.js';
const ORDER_ASC_RATING = 'ORDER_ASC_RATING';
const ORDER_DESC_RATING = 'ORDER_DESC_RATING';

const initialState = {
  videogames: [],
  genres: [],
  createdVideogame: {},
  searchVideogameById: [],
  searchVideogameByName: [],
  filteredVideogames: [],
  orderBy: 'Select',
  filterBy: 'ALL',
  filterBySource: 'ALL'
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: payload,
      }
    case SEARCH_GAME_BY_NAME:
      return {
        ...state,
        searchVideogameByName: payload,
      }
    case GET_GAME_BY_ID:
      return {
        ...state,
        searchVideogameById: payload,
      }
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      }
    case CREATED_GAME:
      return {
        ...state,
        createdVideogame: payload,
      }
    case RESET:
      return {
        ...state,
        videogames: [],
        filteredVideogames: [],
        orderBy: 'Select',
        filterBy: 'ALL',
        filterBySource: 'ALL'
      }
    case FILTER_GAME_BY_GENRE:
      let filterGames = [];
      let filterBySource = '';

      if (payload === 'ALL') {
        filterGames = state.videogames;
        filterBySource = 'ALL';
      }
      else {
        filterGames = state.videogames.filter((game) =>
          (game.genres).includes(payload));
        if(state.filterBySource == 'ALL'){
          filterGames = state.videogames.filter((game) =>
            (game.genres).includes(payload));
          filterBySource = 'ALL';
        }
        else if(state.filterBySource == 'rawgApi'){
          filterGames = filterGames.filter(
            (game) => game.source === 'rawgApi');
          filterBySource = 'rawgApi';
        }
        else if(state.filterBySource == 'DB'){
          filterGames = filterGames.filter(
            (game) => game.source === 'DB');
          filterBySource = 'DB';
        }
      }
      return {
        ...state,
        filteredVideogames: filterGames,
        filterBy: payload,
        filterBySource: filterBySource
      }
    case ORDER_ASC_NAME:
    case ORDER_ASC_RATING:
    case ORDER_DESC_NAME:
    case ORDER_DESC_RATING:
      return {
        ...state,
        filteredVideogames: payload.videogamesOrder,
        orderBy: payload.name,
      }
    case FILTER_GAME_BY_SOURCE:
      return {
        ...state,
        filteredVideogames: payload.filterGames,
        filterBy: payload.source,
        filterBySource: payload.source
      }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
