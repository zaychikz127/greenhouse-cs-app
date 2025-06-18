import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import styles from './Sensor.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const Sensor = () => {
  const [towers, setTowers] = useState([]);
  const [selectedTowerId, setSelectedTowerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sensorData, setSensorData] = useState({
    temperature: 'ออฟไลน์',
    humidity: 'ออฟไลน์',
    lightPercent: 'ออฟไลน์',
    rpm: 'ออฟไลน์', 
  });

  useEffect(() => {
    const fetchTowers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/rotary-towers`);
        const data = await res.json();
        setTowers(data);
        if (data.length > 0) setSelectedTowerId(data[0].id);
      } catch (error) {
        console.error('Error fetching towers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTowers();
  }, []);

  useEffect(() => {
    if (!selectedTowerId) return;

    const fetchAllData = async () => {
      try {
        // Fetch sensor data
        const resSensor = await fetch(`${API_URL}/api/sensor-data`);
        const sensorJson = await resSensor.json();

        // Fetch control tower status
        const resStatus = await fetch(`${API_URL}/api/control-tower/${selectedTowerId}/status`);
        const statusJson = await resStatus.json();

        // Determine RPM from power_on and speed_level
        let rpmValue = 'ออฟไลน์';
        if (statusJson.power_on === 0) {
          rpmValue = '0 rpm';
        } else {
          switch (statusJson.speed_level) {
            case 1:
              rpmValue = '15 rpm';
              break;
            case 2:
              rpmValue = '22 rpm';
              break;
            case 3:
              rpmValue = '29 rpm';
              break;
            default:
              rpmValue = 'ออฟไลน์';
          }
        }

        setSensorData({
          temperature: sensorJson.temperature ? `${sensorJson.temperature}°C` : 'ออฟไลน์',
          humidity: sensorJson.humidity ? `${sensorJson.humidity}%` : 'ออฟไลน์',
          lightPercent: sensorJson.lightPercent ? `${sensorJson.lightPercent}%` : 'ออฟไลน์',
          rpm: rpmValue,
        });

      } catch (error) {
        console.error('Error fetching data:', error);
        setSensorData({
          temperature: 'ออฟไลน์',
          humidity: 'ออฟไลน์',
          lightPercent: 'ออฟไลน์',
          rpm: 'ออฟไลน์',
        });
      }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 3000);

    return () => clearInterval(interval);
  }, [selectedTowerId]);

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <div>
      <div className={styles.topBar}>
        <Dropdown
          value={selectedTowerId}
          options={towers}
          onChange={(e) => setSelectedTowerId(e.value)}
          optionLabel="name"
          optionValue="id"
          className={styles.dropdown}
        />
      </div>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <i className={`pi pi-wave-pulse ${styles.icon}`}></i>
          <div className={styles.label}>อุณหภูมิ</div>
          <div className={`${styles.value} ${sensorData.temperature === 'ออฟไลน์' ? styles.offline : ''}`}>
            {sensorData.temperature}
          </div>
        </div>

        <div className={styles.card}>
          <i className={`pi pi-cloud ${styles.icon}`}></i>
          <div className={styles.label}>ความชื้น</div>
          <div className={`${styles.value} ${sensorData.humidity === 'ออฟไลน์' ? styles.offline : ''}`}>
            {sensorData.humidity}
          </div>
        </div>

        <div className={styles.card}>
          <i className={`pi pi-sun ${styles.icon}`}></i>
          <div className={styles.label}>ความเข้มแสง</div>
          <div className={`${styles.value} ${sensorData.lightPercent === 'ออฟไลน์' ? styles.offline : ''}`}>
            {sensorData.lightPercent}
          </div>
        </div>

        <div className={styles.card}>
          <i className={`pi pi-sync ${styles.icon}`}></i>
          <div className={styles.label}>รอบการหมุนต่อนาที</div>
          <div className={`${styles.value} ${sensorData.rpm === 'ออฟไลน์' ? styles.offline : ''}`}>
            {sensorData.rpm}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sensor;
