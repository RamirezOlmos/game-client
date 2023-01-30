import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createGame, getGenres } from '../../redux/actions.js';
import styles from './CreatGame.module.css';


const CreateGame = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const gameSent = useSelector((state) => state.createdVideogame);
  const platforms = ["PC", "PlayStation 5", "PlayStation 4", "Xbox One",
    "Xbox Series S/X", "Nintendo Switch", "iOS", "Android", "Nintendo 3DS",
    "Nintendo DS", "Nintendo DSi", "macOS", "Linux", "Xbox 360", "Xbox", 
    "PlayStation 3", "PlayStation 2", "PlayStation", "PS Vita", "PSP", 
    "Wii U", "Wii", "GameCube", "Nintendo 64", "Game Boy Advance",
    "Game Boy Color", "Game Boy", "SNES", "NES", "Classic Macintosh", 
    "Apple II", "Commodore / Amiga", "Atari 7800", "Atari 5200", "Atari 2600",
    "Atari Flashback", "Atari 8-bit", "Atari ST", "Atari Lynx", "Atari XEGS", 
    "Genesis", "SEGA Saturn", "SEGA CD", "SEGA 32X", "SEGA Master System", 
    "Dreamcast", "3DO", "Jaguar", "Game Gear","Neo Geo", "Web"]


  useEffect(() => {
      dispatch(getGenres());
  }, []);

  const [inputs, setInputs] = useState({
    name: '',
    image: '',
    description: '',
    released: '',
    rating: 0,
    platforms: [],
    genres: []
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    platforms: '',
    genres: '',
    rating: ''
  });

  const validate = (inputs) => {
      const errors = {};
      if(!inputs.name)
        errors.name = 'Name is require';
      else if(!inputs.description)
        errors.description = 'Description is require';
      else if(inputs.rating > 5 || inputs.rating < 0)
        errors.rating = 'Rating can only be between 0 to 5';
      else if(!inputs.genres.length)
        errors.genres = 'You have to at least add one genre';
      else if(!inputs.platforms.length)
        errors.platforms = 'You have to at least add one platform';

      return errors;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
      setInputs({...inputs, [name]: value});

      setErrors(
        validate({...inputs, [name]: value}));
//    }
  };

  const handleChangeCheckbox = (event) => {
    const { name, value, checked } = event.target;
    if(name === 'platforms'){
      if(checked){
        setInputs({...inputs, 
                  [name]: [...inputs[name], value]});
        setErrors(
          validate({...inputs, [name]: [...inputs[name], value]}));
      }
      else{
        setInputs({...inputs,
                  [name]: inputs[name].filter((platform) =>
          platform !== value)});
        setErrors(validate({...inputs, [name]: inputs[name].filter((platform) => 
          platform !== value)}));
      }
    }
    if(name === 'genres'){
      if(checked){
        setInputs({...inputs, 
                  [name]: [...inputs[name], Number(value)]});
        setErrors(
          validate({...inputs, [name]: [...inputs[name], Number(value)]}));
      }
      else{
        setInputs({...inputs, [name]: inputs[name].filter((genre) => 
          genre !== Number(value))});
        setErrors(validate({...inputs, [name]: inputs[name].filter((genre) => 
          genre !== Number(value))}));}
    }
  }



  const handleSubmit = (event) => {
    event.preventDefault();

    const gameCreated = {
      name: inputs.name,
      description: inputs.description,
      image: inputs.image,
      released: inputs.released,
      rating: inputs.rating,
      genres: inputs.genres,
      platforms: inputs.platforms
    }

    // Validation
    if(!gameCreated.name){
      delete gameCreated.name;
      alert('Name is require to submit form')
      return
    }
    if(!gameCreated.description){
      delete gameCreated.description;
      alert('Description is require to submit form')
      return
    }
    if(!gameCreated.genres.length){
      delete gameCreated.platforms;
      alert('At least one genre is require to submit form')
      return
    }
    if(!gameCreated.platforms.length){
      delete gameCreated.platforms;
      alert('At least one platform is require to submit form')
      return
    }
    if(gameCreated.rating > 5 || gameCreated.rating < 0){
      alert('Rating can only be between 0 to 5')
      return
    }


    dispatch(createGame(gameCreated));

    event.target.reset();
    if('name' in gameCreated &&
       'description' in gameCreated &&
       'platforms' in gameCreated &&
       'genres' in gameCreated){
      alert('Videogame created successfully');
    }

    if(!Object.keys(errors).length){
      setInputs({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: 0,
        platforms: [],
        genres: []
      })

      setErrors({
        name: '',
        description: '',
        platforms: '',
        genres: '' 
      })
    }
  };

  return (
    <div className={styles.container}>
      {
        !('error' in gameSent) ?
        <>
          <h3 className={styles.title}>Insert your Videogame to database!</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
              className={errors.name && 'warning'}
              type="text"
              name="name"
              placeholder="Videogame name..."
              value={inputs.name}
              onChange={handleInputChange}
              id={styles.nameinput}
            ></input>
            <p className='danger'>{errors.name}</p>

            <div>
              <label htmlFor="image">Image URL: </label>
              <input
                className={inputs.name}
                type="text"
                name="image"
                placeholder="Videogame image URL..."
                value={inputs.image}
                onChange={handleInputChange}
                id={styles.nameinput}
              ></input>
            </div>
            
            <label htmlFor="description">Description: </label>
            <textarea
              className={errors.description && 'warning'}
              name="description"
              placeholder="Videogame description..."
              value={inputs.description}
              onChange={handleInputChange}
              id={styles.nameinput}
            ></textarea>
            <p className='danger'>{errors.description}</p>

            <div id={styles.releaserating}>
                <div>
                  <label htmlFor="released">Released: </label>
                  <input
                    className={inputs.released}
                    type="text"
                    name="released"
                    placeholder="Videogame released..."
                    value={inputs.released}
                    onChange={handleInputChange}
                    id={styles.releasebox}
                  ></input>
                </div>

                <div>
                  <label htmlFor="rating">Rating: </label>
                  <input
                    className={inputs.rating}
                    type="number"
                    name="rating"
                    placeholder="Videogame rating..."
                    value={inputs.rating}
                    onChange={handleInputChange}
                    max='5'
                    min='0'
                    id={styles.releasebox}
                  ></input>
                  <p className='danger'>{errors.rating}</p>
                </div>
            </div>


            <div>
              <label htmlFor="genres">Genres:</label>
              <div>
                {
                  genres.map((genre) => (
                    <label key={genre.id}>
                      <input
                        type="checkbox"
                        name="genres"
                        value={genre.id}
                        checked={inputs?.genres?.includes(genre.id)}
                        onChange={handleChangeCheckbox}
                        id={styles.checks}
                      ></input>
                      {genre.name}
                    </label>
                  ))
                }
              </div>
              <p className='danger'>{errors.genres}</p>
            </div>
            <div>
              <label htmlFor="platforms">Platforms:</label>
              <div>
                {
                  platforms.map((platform) => (
                    <label key={platform}>
                      <input
                        type="checkbox"
                        name="platforms"
                        value={platform}
                        checked={inputs?.platforms?.includes(platform)}
                        onChange={handleChangeCheckbox}
                      ></input>
                      {platform}
                    </label>
                  ))
                }
              </div>
              <p className='danger'>{errors.platforms}</p>
            </div>
            <button type="submit" 
                    disabled={Object.keys(errors).length !== 0}
            >
              Create</button>
          </form>
        </>
         : <h1>Error: {gameSent.error}</h1>
      }
    </div>
  )
};

export default CreateGame;
