import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getGenres,
  filterByGenre,
  orderAsc,
  orderDesc,
  filterBySource
} from '../../redux/actions.js';
import './Filter.css';


const Filter = ({ paginate }) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const handleGenreFilter = (event) => {
    const { value } = event.target;
    dispatch(filterByGenre(value));
    paginate(1);
  };
  let key = 0;

  const handleAscDescOrder = (event) => {
    const { value } = event.target;
    if (value === 'asc_name' || value === 'asc_rating') {
      dispatch(orderAsc(value));
    }
    else if (value === 'desc_name' || value === 'desc_rating') {
      dispatch(orderDesc(value));
    }
  };

  const handleSourceFilter = (event) =>{
    const { value } = event.target;
    if(value === 'rawgApi' || value === 'DB'){
      dispatch(filterBySource(value));
      paginate(1);
    }
    else{
      dispatch(filterByGenre(value));
      paginate(1);
    }

  };

  return (
    <div className='filter'>
      <div>
        <div>Filter by Genre</div>
        <select name='genre' id='genre-select'
          onChange={handleGenreFilter}>
          <option value='ALL'>All</option>
          {
            genres.map((genre) => {
              ++key;
              return <option key={key} value={genre.name}>{genre.name}</option>
            })
          }
        </select>
      </div>
      <div>
        <div>Order By</div>
        <select onChange={handleAscDescOrder}>
          <option value={'ALL'}>All</option>
          <option value='asc_name'>Alphabetically (A-Z)</option>
          <option value='desc_name'>Alphabetically (Z-A)</option>
          <option value='asc_rating'>Lower to Higher Rating</option>
          <option value='desc_rating'>Higher to Lower Descending</option>
        </select>
      </div>
      <div>
        <div>Filter By Source</div>
        <select onChange={handleSourceFilter}>
          <option value={'ALL'}>All</option>
          <option value='rawgApi'>Rawg API Videogames</option>
          <option value='DB'>Created By User</option>
        </select>
      </div>
    </div>
  );

}

export default Filter;
