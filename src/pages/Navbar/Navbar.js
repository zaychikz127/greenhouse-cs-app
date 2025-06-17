import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (path) => {
    setVisible(false);
    navigate(path);
  };

  return (
    <div className={styles.navbarContainer}>
      {/* ปุ่มเปิด Sidebar ฝั่งซ้าย */}
      <Button
        label="เมนูหลัก"
        icon="pi pi-bars"
        className="p-button-text p-button-sm p-button-secondary"
        onClick={() => setVisible(true)}
      />

      {/* ปุ่มเข้าสู่ระบบฝั่งขวาสุด */}
      <div>
        <Button
          label="เข้าสู่ระบบ"
          icon="pi pi-user"
          className="p-button-sm"
          onClick={() => navigate('/login')}
        />
      </div>

      {/* Sidebar ฝั่งซ้าย (เมนูหลัก) */}
      <Sidebar
        visible={visible}
        position="left"
        onHide={() => setVisible(false)}
        style={{ width: '250px' }}
      >
        <h3>เมนูหลัก</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>
            <Button
              label="หน้าแรก"
              icon="pi pi-home"
              className="p-button-text p-button-secondary"
              onClick={() => handleMenuClick('/')}
            />
          </li>
          <li>
            <Button
              label="แดชบอร์ด"
              icon="pi pi-chart-line"
              className="p-button-text p-button-secondary"
              onClick={() => handleMenuClick('/dashboard')}
            />
          </li>
        </ul>
      </Sidebar>
    </div>
  );
};

export default Navbar;
