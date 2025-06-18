import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useNavigate } from 'react-router-dom';
import styles from './NavbarAdmin.module.css';

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  const handleMenuClick = (path) => {
    setLeftVisible(false);
    setRightVisible(false);
    navigate(path);
  };

  return (
    <div className={styles.navbarContainer}>
      {/* ปุ่มเปิดเมนูฝั่งซ้าย */}
      <Button
        label="เมนูหลัก"
        icon="pi pi-bars"
        className="p-button-text p-button-sm p-button-secondary"
        onClick={() => setLeftVisible(true)}
      />

      {/* ปุ่มเปิดเมนูฝั่งขวา */}
      <Button
        label="ผู้ดูแลระบบ"
        icon="pi pi-user"
        className="p-button-text p-button-sm p-button-secondary"
        onClick={() => setRightVisible(true)}
      />

      {/* Sidebar ฝั่งซ้าย (เมนูหลัก) */}
      <Sidebar
        visible={leftVisible}
        position="left"
        onHide={() => setLeftVisible(false)}
        style={{ width: '250px' }}
      >
        <h3>เมนูหลัก</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>
            <Button
              label="แดชบอร์ด"
              icon="pi pi-chart-line"
              className="p-button-text p-button-secondary"
              onClick={() => handleMenuClick('/dashboard-admin')}
            />
          </li>
          <li>
            <Button
              label="ควบคุมแท่นปลูก"
              icon="pi pi-sync"
              className="p-button-text p-button-secondary"
              onClick={() => handleMenuClick('/rotary-tower-list')}
            />
          </li>
          <li>
            <Button
              label="จัดการหน้าแรก"
              icon="pi pi-pen-to-square"
              className="p-button-text p-button-secondary"
              onClick={() => handleMenuClick('/home-manage')}
            />
          </li>
        </ul>
      </Sidebar>

      {/* Sidebar ฝั่งขวา (เมนูผู้ดูแลระบบ) */}
      <Sidebar
        visible={rightVisible}
        position="right"
        onHide={() => setRightVisible(false)}
        style={{ width: '250px' }}
      >
        <h3>เมนูผู้ดูแลระบบ</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li>
            <Button
              label="เปลี่ยนรหัสผ่าน"
              icon="pi pi-lock"
              className="p-button-text p-button-secondary"
              onClick={() => handleMenuClick('/change-password')}
            />
          </li>
          <li>
            <Button
              label="ตั้งค่าการแจ้งเตือน"
              icon="pi pi-bell"
              className="p-button-text p-button-secondary"
              onClick={() => handleMenuClick('/notification-settings')}
            />
          </li>
          <li>
            <Button
              label="ออกจากระบบ"
              icon="pi pi-sign-out"
              className="p-button-text p-button-danger"
              onClick={() => {
                localStorage.removeItem('token');
                setRightVisible(false);
                navigate('/');
              }}
            />
          </li>
        </ul>
      </Sidebar>
    </div>
  );
};

export default NavbarAdmin;
