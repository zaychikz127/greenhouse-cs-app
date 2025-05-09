import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import styles from './Sensor.module.css';

const Sensor = () => {
  const [selectedSystem, setSelectedSystem] = useState('system1');

  const systems = [
    { label: 'แท่นปลูกแบบหมุน 1', value: 'system1' },
    { label: 'แท่นปลูกแบบหมุน 2', value: 'system2' },
  ];

  const sensorData = {
    system1: [
      { label: 'อุณหภูมิ', value: '25°C', icon: 'pi pi-wave-pulse' },
      { label: 'ความชื้น', value: '60%', icon: 'pi pi-cloud' },
      { label: 'ความเข้มแสง', value: '50%', icon: 'pi pi-sun' },
      { label: 'รอบการหมุนแท่นปลูก', value: '5 rpm', icon: 'pi pi-sync' },
    ],
    system2: null, // ไม่มีข้อมูล
  };

  const cards = sensorData[selectedSystem];

  return (
    <div>
      <div className={styles.topBar}>
        <Dropdown
          value={selectedSystem}
          options={systems}
          onChange={(e) => setSelectedSystem(e.value)}
          placeholder="เลือกแท่นปลูก"
          className={styles.dropdown}
        />
      </div>

      <div className={styles.cardGrid}>
        {(cards ?? [
          { label: 'อุณหภูมิ', value: 'ออฟไลน์', icon: 'pi pi-wave-pulse' },
          { label: 'ความชื้น', value: 'ออฟไลน์', icon: 'pi pi-cloud' },
          { label: 'ความเข้มแสง', value: 'ออฟไลน์', icon: 'pi pi-sun' },
          { label: 'รอบการหมุนแท่นปลูก', value: 'ออฟไลน์', icon: 'pi pi-sync' },
        ]).map((card, index) => (
          <div key={index} className={styles.card}>
            <i className={`${card.icon} ${styles.icon}`}></i>
            <div className={styles.label}>{card.label}</div>
            <div className={styles.value}>{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sensor;
