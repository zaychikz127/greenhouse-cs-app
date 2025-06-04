import React, { useEffect, useState } from 'react';
import styles from './RotaryTowerList.module.css';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

const API_URL = process.env.REACT_APP_API_URL;

const RotaryTowerList = () => {
  const [rotaryTowers, setRotaryTowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/rotary-towers`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setRotaryTowers(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loadingOverlay}>
            <ProgressSpinner />
          </div>
        ) : (
          <div className={styles.cardGrid}>
            {rotaryTowers.map(tower => (
              <div key={tower.id} className={styles.card}>
                <div
                  className={`${styles.label} ${
                    tower.status === 'offline' ? styles.offline : ''
                  }`}
                >
                  {tower.name}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Button
                    label="ควบคุม"
                    className="p-button-primary p-button-sm"
                    onClick={() => alert(`ควบคุมแท่นปลูก: ${tower.name}`)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RotaryTowerList;
