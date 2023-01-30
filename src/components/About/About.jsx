import node from './Node.js_logo.svg';
import express from './express-js.png';
import postgres from './Postgresql_elephant.svg.png';
import react from './1024px-React.svg.png';
import redux from './1920px-Redux_Logo.png';
import sequelize from './sequelize.svg';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <h1>About this Project</h1>
      <div>
        <h3>The project was develop by Deneb Ramirez Olmos for the final individual project</h3>
        <h3>in the Henry Bootcamp.</h3>
        <h3>The video game data was gather from the</h3>
        <h3>{<a href="https://rawg.io/apidocs">RAWG</a>} API.</h3>
        <h3>The following technologies were used in the project: </h3>
      </div>
      <div className={styles.logos}>
        <img className={styles.logo} src={node} alt="nodelogo" />
        <img className={styles.logoex} src={express} alt="expresslogo" />
        <img className={styles.logo} src={postgres} alt="postgreslogo" />
        <img className={styles.logorea} src={react} alt="reduxlogo" />
        <img className={styles.logored} src={redux} alt="reduxlogo" />
        <img className={styles.logoseq} src={sequelize} alt="sequelizelogo" />
      </div>

    </div>
  )
};

export default About;
