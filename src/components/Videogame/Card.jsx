import React from 'react';
import { Link } from "react-router-dom";
import './Card.css';
import noImage from './NoImage.jpg';


const Card = (props) => {
  const { id, name, image, 
    rating, genres } = props;

  return (
    <div className='card'>
        <Link to={`/detail/${id}`}>
          {
            image === null || !image ? 
            (<img className='img' src={noImage} alt={name} />) : 
            (<img className='img' src={image} alt={name} />)
          }
        </Link>
      <div className='text-card'>
        <div className='name-genres'>
          <div className='name'>{name}</div>
          <div className='genres'>{genres}</div>
        </div>
        <div className='div-rating'>
          <div className='rating'>{rating}</div>
        </div>
      </div>
    </div>
  )
}

export default Card;
