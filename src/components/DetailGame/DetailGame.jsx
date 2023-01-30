import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameById } from '../../redux/actions.js';
import noImage from '../Videogame/NoImage.jpg';
import styles from './DetailGame.module.css';
import App from '../../App.js';

export default function DetailGame() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.searchVideogameById);
  const navigate = useHistory();

  useEffect(() => {
    dispatch(getGameById(id));
  }, []);

  const backToHome = () => navigate.push("/home");
  console.log(videogame);


  return (
    <div className={styles.full}>
      {
        !('error' in videogame) ?
        <>
          <div className={styles.info}>
            <div className={styles.image}>
              {
                videogame.image === null || !videogame.image ? 
                (<img src={noImage} alt={videogame.name} />) : 
                (<img
                  src={videogame.image}
                  alt={videogame.name + "picture"}
                />)
              }
              <div>
                <h1>{videogame.name}</h1>
                <h5>Released: {videogame.released}</h5>
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.text}>
                <p>Description: {videogame.description}</p>
              </div>
              <div className={styles.Genres}>
                <div className={styles.genres}>
                  <p>Genres: {videogame.genres}</p>
                </div>
                <div className={styles.genres}>
                  <p>Rating: {videogame.rating}</p>
                </div>
              </div>
              <div className={styles.Platforms}>
                <div className={styles.platforms}>
                  <p>Platforms: {videogame.platforms}</p>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.ButtonBack}
            onClick={() => { backToHome() }}>
            Home
          </button>
        </>
        : <h1>Error: {videogame.error}</h1> 
      }
    </div>
  );
}
