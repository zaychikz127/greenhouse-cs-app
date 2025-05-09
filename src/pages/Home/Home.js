import React from 'react';
import styles from './Home.module.css';
import Navbar from '../Navbar/Navbar';
import Showcase from './components/Showcase/Showcase';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Showcase />
      </div>
    </>
  );
};

export default Home;
