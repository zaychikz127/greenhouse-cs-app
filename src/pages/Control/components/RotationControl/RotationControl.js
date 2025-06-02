import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Slider } from 'primereact/slider';
import styles from './RotationControl.module.css';

const RotationControl = () => {
  const [selectedSystem, setSelectedSystem] = useState('system1');
  const [rotationSpeed, setRotationSpeed] = useState(0);

  const systems = [
    { label: 'แท่นปลูกแบบหมุน 1', value: 'system1' },
    // { label: 'แท่นปลูกแบบหมุน 2', value: 'system2' },
  ];

  const speedLabels = ['หยุดการทำงาน', 'ช้า', 'ปานกลาง', 'เร็ว'];

  const lightIntensity = selectedSystem === 'system1' ? 50 : 0;
  const rotationRpm = selectedSystem === 'system1' ? 0 : 0; // ไม่เปลี่ยนตาม slider แล้ว
  const isOffline = selectedSystem === 'system2';

  return (
    <div className={styles.card}>
      <div className={styles.topBar}>
        <Dropdown
          value={selectedSystem}
          options={systems}
          onChange={(e) => {
            setSelectedSystem(e.value);
            setRotationSpeed(0);
          }}
          placeholder="เลือกแท่นปลูก"
          className={styles.dropdown}
        />
      </div>

      {isOffline ? (
        <div className={styles.offline}>แท่นปลูกนี้ไม่มีข้อมูล</div>
      ) : (
        <>
          {/* Card แสดงระดับความเร็ว */}
          <div className={styles.centeredCardGrid}>
            <div className={`${styles.cardItem} ${styles.speedCard}`}>
              <div className={styles.label}>ระดับความเร็ว</div>
              <div className={styles.value}>{speedLabels[rotationSpeed]}</div>

              <div className={styles.sliderGroup}>
                <div className={styles.sliderWrapper}>
                  <Slider
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(e.value)}
                    min={0}
                    max={3}
                    step={1}
                    className={styles.slider}
                  />
                </div>
              </div>
            </div>
          </div>


          <div className={styles.cardGrid}>
            <div className={styles.cardItem}>
              <i className={`pi pi-sun ${styles.icon}`}></i>
              <div className={styles.label}>ความเข้มแสง</div>
              <div className={styles.value}>{lightIntensity}%</div>
            </div>
            <div className={styles.cardItem}>
              <i className={`pi pi-sync ${styles.icon}`}></i>
              <div className={styles.label}>รอบการหมุน</div>
              <div className={styles.value}>{rotationRpm} rpm</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RotationControl;
