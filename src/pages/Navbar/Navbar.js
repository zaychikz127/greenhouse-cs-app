import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'หน้าแรก',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: 'แดชบอร์ด',
      icon: 'pi pi-chart-line',
      command: () => navigate('/dashboard')
    }
  ];

  const end = (
    <div className={styles.buttons}>
      <Button label="ติดต่อเรา" icon="pi pi-phone" className="p-button-text p-button-sm p-button-secondary" />
      <Button label="เข้าสู่ระบบ" icon="pi pi-user" className="p-button-sm" onClick={() => navigate('/login')}/>
    </div>
  );

  return (
    <div className={styles.sticky}>
      <Menubar model={items} end={end} />
    </div>
  );
};

export default Navbar;
