import React from 'react';
import { Link } from "react-router-dom";
import styles from './NavBar.module.css';

const NavBar = (props) => {
  const { name, inputNameHandler,
    handleClick } = props;

  return (
    <div className={styles.navBar}>
      <div className={styles.videogames}>
        <Link to='/'>
          <h3>Videogames!</h3>
        </Link>
      </div>
      <div className={styles.home}>
        <Link to='/home'><button>HOME</button></Link>
      </div>
      <div className={styles.searchbar}>
        <input
          type="search"
          name="gameName"
          value={name}
          onChange={inputNameHandler}
          placeholder="Enter videogame name"
        ></input>
        <button onClick={() => handleClick(name)}> Search</button>
      </div>
      <div className={styles.create}>
        <Link to='/creategame'><button>Create Game</button></Link>
      </div>
      <div className={styles.about}>
        <Link to='/about'><button>About</button></Link>
      </div>
      <hr />
    </div>

  );
};

export default NavBar;

