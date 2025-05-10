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
      { label: 'รอบการหมุน', value: '5 rpm', icon: 'pi pi-sync' },
      { label: 'สถานะการทำการของแท่นหมุน', value: 'กำลังทำงาน', icon: 'pi pi-spinner' },
      { label: 'สถานะการทำงานของปั๊มน้ำ', value: 'กำลังทำงาน', icon: 'pi pi-gauge' },
    ],
    system2: null,
  };

  const defaultCards = [
    { label: 'อุณหภูมิ', value: 'ออฟไลน์', icon: 'pi pi-wave-pulse' },
    { label: 'ความชื้น', value: 'ออฟไลน์', icon: 'pi pi-cloud' },
    { label: 'ความเข้มแสง', value: 'ออฟไลน์', icon: 'pi pi-sun' },
    { label: 'รอบการหมุน', value: 'ออฟไลน์', icon: 'pi pi-sync' },
    { label: 'สถานะการทำการของแท่นหมุน', value: 'หยุดทำงาน', icon: 'pi pi-spinner' },
    { label: 'สถานะการทำงานของปั๊มน้ำ', value: 'หยุดทำงาน', icon: 'pi pi-gauge' },
  ];

  const cards = sensorData[selectedSystem] ?? defaultCards;
  const topCards = cards.slice(0, 4);
  const bottomCards = cards.slice(4, 6);

  const getValueClass = (value, isBottom) => {
    if (value === 'ออฟไลน์' || value === 'หยุดทำงาน') {
      return styles.statusOff;
    }
    if (isBottom && value === 'กำลังทำงาน') {
      return styles.statusOn;
    }
    return styles.value;
  };

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

      <div className={styles.cardRowTop}>
        {topCards.map((card, index) => (
          <div key={index} className={styles.card}>
            <i className={`${card.icon} ${styles.icon}`}></i>
            <div className={styles.label}>{card.label}</div>
            <div className={getValueClass(card.value, false)}>{card.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.cardRowBottom}>
        {bottomCards.map((card, index) => (
          <div key={index} className={styles.card}>
            <i className={`${card.icon} ${styles.icon}`}></i>
            <div className={styles.label}>{card.label}</div>
            <div className={getValueClass(card.value, true)}>{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sensor;
