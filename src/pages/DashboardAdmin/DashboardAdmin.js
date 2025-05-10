import React from 'react';
import styles from './DashboardAdmin.module.css';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import Sensor from './components/Sensor/Sensor';
// import ChartGrowth from './components/Chart/ChartGrowth';

const DashboardAdmin = () => {
  return (
    <>
      <NavbarAdmin />
      <div className={styles.container}>
        <Sensor />
        {/* <ChartGrowth /> */}
      </div>
    </>
  );
};

export default DashboardAdmin;
