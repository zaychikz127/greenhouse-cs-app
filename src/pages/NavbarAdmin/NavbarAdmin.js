import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useNavigate } from 'react-router-dom';
import styles from './NavbarAdmin.module.css';

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const items = [
    {
      label: 'แดชบอร์ด',
      icon: 'pi pi-chart-line',
      command: () => navigate('/dashboard-admin')
    },
    {
      label: 'การควบคุม',
      icon: 'pi pi-chart-line',
      command: () => navigate('/control')
    }
  ];

  const handleMenuClick = (path) => {
    setVisible(false);
    navigate(path);
  };

  const end = (
    <div className={styles.buttons}>
      <Button
        label="ผู้ดูแลระบบ"
        icon="pi pi-user"
        className="p-button-text p-button-sm p-button-secondary"
        onClick={() => setVisible(true)}
      />
    </div>
  );

  return (
    <div className={styles.sticky}>
      <Menubar model={items} end={end} />
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
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
                setVisible(false);
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
