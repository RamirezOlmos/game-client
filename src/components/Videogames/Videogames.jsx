import React from 'react';
import Card from '../Videogame/Card.jsx';
import styles from './Videogames.module.css';
import loadingGift from './loading_animations.gif';


const Videogames = ({videogames}) => {

  return (
    <div className={styles.showing}>
      {
        videogames.length ?
        videogames.map((game) => {
          return (
            <Card
              name={game.name}
              image={game.image}
              rating={game.rating}
              platforms={game.platforms}
              genres={game.genres}
              key={game.id}
              id={game.id}
            />
          )
        })
        : <>
            <img id={styles.loading} src={loadingGift} alt="Loading" />
            <h2>Loading...</h2> 
          </>
      }
      
    </div>
  );
};

export default Videogames;
