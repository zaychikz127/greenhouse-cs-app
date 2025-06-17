import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import styles from './NavbarBack.module.css';

const NavbarBack = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.sticky}>
      <Button
        label="ย้อนกลับ"
        icon="pi pi-arrow-circle-left"
        className="p-button-text p-button-sm p-button-secondary"
        onClick={() => navigate('/')}
      />
    </div>
  );
};

export default NavbarBack;
