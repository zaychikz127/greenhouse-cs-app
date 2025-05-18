import React from 'react';
import styles from './DashboardAdmin.module.css';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Sensor from './components/Sensor/Sensor';
import PlantGrowthChart from './components/Chart/PlantGrowthChart';

const DashboardAdmin = () => {
  return (
    <>
      <NavbarAdmin />
      <div className={styles.container}>
        <Sensor />
        <PlantGrowthChart />
      </div>
    </>
  );
};

export default DashboardAdmin;
