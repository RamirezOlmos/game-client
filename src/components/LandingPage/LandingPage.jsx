import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className='background'>
      <div className='title'>
        <h2>Videogames Data Heaven</h2>
        <Link to='/home'>
          <button type="submit">ENTER</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
