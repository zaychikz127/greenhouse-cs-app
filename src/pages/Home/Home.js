import React from 'react';
import styles from './Home.module.css';
import Navbar from '../Navbar/Navbar';
import Showcase from './components/Showcase/Showcase';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Greenhouse CS MSU</h1>
        <p className={styles.description}>ยินดีต้อนรับสู่ระบบการจัดการ การปลูกพืช Aeroponic</p>
        <Showcase />
      </div>
    </>
  );
};

export default Home;
