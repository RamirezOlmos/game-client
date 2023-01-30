import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchGameByName } from '../../redux/actions';
import Videogames from '../Videogames/Videogames';
import Pagination from '../Pagination/Pagination';
import styles from './SearchByName.module.css';

function SearchByName() {
  const dispatch = useDispatch();
  let { name } = useParams();
  const [page, setPage] = useState(1);
  const videogamesPerPage = 15;
  const [inputName, setInputName] = useState(name);

  const searchVideogameByName = useSelector(
    (state) => state.searchVideogameByName);

  useEffect(() => {
    setInputName(name);
    dispatch(searchGameByName(name));
  }, [name]);

  function paginate(pgNum){
    setPage(pgNum);
  }

  let lastCardPerPage = page * videogamesPerPage;
  let firstCardPerPage = lastCardPerPage - videogamesPerPage;
  let currentGamesPerPage = [];
  if(searchVideogameByName.length){
    currentGamesPerPage = searchVideogameByName.slice(
      firstCardPerPage, lastCardPerPage);
  }

  return (
    <div className={styles.search} key={inputName}>
      {
        !('error' in searchVideogameByName) ?
        <>
          <div className={styles.titlesection}>
            <h1>Results with {inputName}</h1>
          </div>
          <div className={styles.videogamessection}>
          <Videogames videogames={currentGamesPerPage} />
          </div>
          <Pagination 
            gamesPerPage={videogamesPerPage}
            totalVideogames={searchVideogameByName.length}
            paginate={paginate}
            currentPage={page}
          />
        </>
        : <h1>Error: {searchVideogameByName.error}</h1> 
      }  
    </div>
  )
};

export default SearchByName;
