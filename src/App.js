import './App.css';
import { Route, useLocation, useHistory } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CreateGame from './components/CreateGame/CreateGame.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import DetailGame from './components/DetailGame/DetailGame.jsx';
import SearchByName from './components/SearchByName/SearchByName.jsx';
import About from './components/About/About.jsx';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState('');

  useEffect(() => {
    setName(name);
  }, [name]);

  const inputNameHandler = (event) => {
    setName(event.target.value);
  }

  const handleClick = (name) => {
    history.push(`/resultsearch/${name}`)
  }

  return (
    <div className={location.pathname === '/' ? 'landing-page' : 'App'}>
      <div>
        {
          (() => {
              if(location.pathname !== "/") {
                  return <NavBar 
                    name={name}
                    inputNameHandler={inputNameHandler}
                    handleClick={handleClick}
                  />;
              }
          })()
        }
      </div>
      <Route exact path='/' component={LandingPage}  />
      <Route exact path='/home' component={Home} />
      <Route exact path='/creategame' component={CreateGame} />
      <Route exact path="/detail/:id" component={DetailGame} />
      <Route exact path="/resultsearch/:name" key={name} component={SearchByName} />
      <Route exact path='/about' component={About} />
    </div>
  );
}

export default App;
