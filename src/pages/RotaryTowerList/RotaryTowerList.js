import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RotaryTowerList.module.css';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { showAutoCloseError, showAutoCloseSuccess } from '../../utils/dialog/alertDialog';

const API_URL = process.env.REACT_APP_API_URL;

const RotaryTowerList = () => {
  const [rotaryTowers, setRotaryTowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [controllingTowerId, setControllingTowerId] = useState(null);
  const navigate = useNavigate();

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

  const handleControlClick = (towerId, towerName) => {
    setControllingTowerId(towerId);

    fetch(`${API_URL}/api/control-tower/${towerId}`, {
      method: 'PUT',
    })
      .then(async res => {
        if (res.status === 409) {
          showAutoCloseError('ข้อผิดพลาด', `${towerName} กำลังถูกควบคุมจากผู้ใช้อื่น`);
          throw new Error('Tower is already controlled');
        }

        if (!res.ok) {
          throw new Error('Failed to update control status');
        }

        return res.json();
      })
      .then(() => {
        showAutoCloseSuccess('เข้าควบคุมสำเร็จ', `กำลังควบคุมแท่นปลูก ${towerName}`);
        navigate(`/control-tower/${towerId}`);
      })
      .catch(err => {
        console.error('Error updating control status:', err);
      })
      .finally(() => {
        setControllingTowerId(null);
      });
  };

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
                  className={`${styles.label} ${tower.status === 'offline' ? styles.offline : ''
                    }`}
                >
                  {tower.name}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Button
                    label="ควบคุม"
                    className="p-button-primary p-button-sm"
                    onClick={() => handleControlClick(tower.id, tower.name)}
                    disabled={controllingTowerId === tower.id}
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
