import { useState, useEffect } from 'react';
import Videogames from '../Videogames/Videogames.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import Filter from '../Filter/Filter.jsx';
import styles from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, resetAll } from '../../redux/actions.js';


const Home = () => {
  const dispatch = useDispatch();
  const filteredGames = useSelector((state) => state.filteredVideogames);
  const filterBy = useSelector((state) => state.filterBy);
  const orderBy = useSelector((state) => state.orderBy);
  const videogames = useSelector((state) => state.videogames);
  const errorVideogames = useSelector((state) => state.errorvideogames);
  const [page, setPage] = useState(1);
  const videogamesPerPage = 15;

  useEffect(() => {
    dispatch(resetAll());
    dispatch(getVideogames());
  }, []);


  //Pagination
  const paginate = (pgNum) => {
    setPage(pgNum);
  }

  let allVideogames = [];
  if(filterBy === 'ALL' && orderBy === 'Select'){
    allVideogames = videogames;
  }
  else{
    allVideogames = filteredGames;
  }


  let lastCardPerPage = page * videogamesPerPage;
  let firstCardPerPage = lastCardPerPage - videogamesPerPage;
  let currentGamesPerPage = [];
  if(allVideogames.length > 0){
    currentGamesPerPage = allVideogames.slice(
      firstCardPerPage, lastCardPerPage);
  }

  return (
    <div className={styles.home}>
      {
        !('error' in videogames) ?
        <>
          <div className={styles.filtersection}>
            <Filter paginate={paginate} />
          </div>
          <div className={styles.videogamessection}>
            <Videogames videogames={currentGamesPerPage}/>
          </div>
          <Pagination 
            gamesPerPage={videogamesPerPage}
            totalVideogames={allVideogames.length}
            paginate={paginate}
            currentPage={page}
          />
        </>
         :<h1 id={styles.error}>Error: {videogames.error}</h1> 
      }
    </div>
  );
};

export default Home;
