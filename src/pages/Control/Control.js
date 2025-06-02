import React from 'react';
import styles from './Control.module.css';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import RotationControl from './components/RotationControl/RotationControl';

const Control = () => {
  return (
    <>
      <NavbarAdmin />
      <div className={styles.container}>
        <RotationControl />
      </div>
    </>
  );
};

export default Control;
