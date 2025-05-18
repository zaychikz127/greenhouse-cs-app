import React from 'react';
import styles from './Dashboard.module.css';
import Navbar from '../Navbar/Navbar';
import Sensor from './components/Sensor/Sensor';
import PlantGrowthChart from './components/Chart/PlantGrowthChart';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Sensor />
        <PlantGrowthChart />
      </div>
    </>
  );
};

export default Dashboard;
