import React from 'react';
import styles from './Dashboard.module.css';
import Navbar from '../Navbar/Navbar';
import Sensor from './components/Sensor/Sensor';
// import ChartGrowth from './components/Chart/ChartGrowth';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Sensor />
        {/* <ChartGrowth /> */}
      </div>
    </>
  );
};

export default Dashboard;
