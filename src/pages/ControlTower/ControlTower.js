import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ControlTower.module.css';

const API_URL = process.env.REACT_APP_API_URL;

const ControlTower = () => {
  const navigate = useNavigate();
  const { towerId } = useParams();

  const [isPowerOff, setIsPowerOff] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(null);
  const [isSpeedButtonDisabled, setIsSpeedButtonDisabled] = useState(false);
  const [isExitDisabled, setIsExitDisabled] = useState(false);
  const [hasExited, setHasExited] = useState(false);

  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    preventBack();
    window.addEventListener('popstate', preventBack);

    return () => {
      window.removeEventListener('popstate', preventBack);
    };
  }, []);

  const handleExit = useCallback(async () => {
    if (hasExited) return;
    setHasExited(true);
    setIsExitDisabled(true);
    try {
      const response = await fetch(`${API_URL}/api/control-tower/${towerId}/release`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/rotary-tower-list', { replace: true });
      } else {
        console.error(result.message);
        alert('เกิดข้อผิดพลาด: ' + result.message);
        setIsExitDisabled(false);
        setHasExited(false);
      }
    } catch (error) {
      setIsExitDisabled(false);
      setHasExited(false);
    }
  }, [towerId, navigate, hasExited]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/api/control-tower/${towerId}/status`);
        const result = await response.json();

        if (response.ok) {
          setIsPowerOff(result.power_on === 0);

          const reverseSpeedMap = {
            0: 'auto',
            1: 'slow',
            2: 'medium',
            3: 'fast'
          };

          setSpeedLevel(reverseSpeedMap[result.speed_level]);
        } else {
          console.error(result.message);
          alert('ไม่สามารถโหลดสถานะของแท่นปลูก: ' + result.message);
        }
      } catch (error) {
        console.error('Error fetching status:', error);
        alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
      }
    };

    fetchStatus();
  }, [towerId]);

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleExit();
      }, 20000);
    };

    const handleBeforeUnload = () => {
      navigator.sendBeacon(`${API_URL}/api/control-tower/${towerId}/release`);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleExit();
      }
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleExit, towerId]);

  const handlePowerToggle = async () => {
    if (isButtonDisabled) return;

    const willTurnOn = isPowerOff;

    if (willTurnOn) {
      setSpeedLevel('auto');
      setIsSpeedButtonDisabled(true);
      setTimeout(() => {
        setIsSpeedButtonDisabled(false);
      }, 5000);
    } else {
      setSpeedLevel('auto');
    }

    setIsPowerOff((prev) => !prev);
    setIsButtonDisabled(true);
    setIsExitDisabled(true);

    try {
      const response = await fetch(`${API_URL}/api/control-tower/${towerId}/power`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ power_on: willTurnOn ? 1 : 0 })
      });

      const result = await response.json();
      if (!response.ok) {
        console.error(result.message);
        alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ Power: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating power_on:', error);
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
    }

    setTimeout(() => {
      setIsButtonDisabled(false);
      setIsExitDisabled(false);
    }, 5000);
  };

  const handleSpeedChange = async (level) => {
    if (isSpeedButtonDisabled) return;

    setSpeedLevel(level);
    setIsSpeedButtonDisabled(true);
    setIsButtonDisabled(true);
    setIsExitDisabled(true);

    const speedMap = {
      auto: 0,
      slow: 1,
      medium: 2,
      fast: 3
    };

    const speedValue = speedMap[level];

    try {
      const response = await fetch(`${API_URL}/api/control-tower/${towerId}/speed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ speed_level: speedValue })
      });

      const result = await response.json();
      if (!response.ok) {
        console.error(result.message);
        alert('เกิดข้อผิดพลาดในการอัปเดตระดับความเร็ว: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating speed_level:', error);
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
    }

    setTimeout(() => {
      setIsSpeedButtonDisabled(false);
      setIsButtonDisabled(false);
      setIsExitDisabled(false);
    }, 5000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>แท่นปลูกแบบหมุน {towerId}</h1>

        <div className={styles.buttonContainer}>
          <Button
            icon="pi pi-power-off"
            className={`p-button-rounded 
              ${isPowerOff ? 'p-button-outlined p-button-danger' : 'p-button-success'} 
              ${styles.largeButton}
            `}
            onClick={handlePowerToggle}
            disabled={isButtonDisabled}
            pt={{
              icon: { className: styles.largeIcon }
            }}
          />
        </div>

        <p className={styles.statusText}>
          {isPowerOff ? 'ปิด' : 'เปิด'}
        </p>

        <p className={styles.speedLabel}>ระดับความเร็วการหมุน</p>

        <div className={styles.speedButtons} style={{ display: 'flex', gap: '20px' }}>
          {['slow', 'medium', 'fast'].map((level) => (
            <Button
              key={level}
              label={level === 'slow' ? 'ช้า' : level === 'medium' ? 'ปานกลาง' : 'เร็ว'}
              className={`${speedLevel === level ? 'p-button-primary' : 'p-button-outlined'} ${styles.equalButton}`}
              onClick={() => handleSpeedChange(level)}
              disabled={isPowerOff || isSpeedButtonDisabled}
            />
          ))}
        </div>

        <div className={styles.equalButtonContainer}>
          <div className={styles.equalButtonWrapper}>
            <Button
              label="รีเซ็ตเป็นอัตโนมัติ"
              className={`p-button-secondary ${styles.equalButton}`}
              onClick={() => handleSpeedChange('auto')}
              disabled={isPowerOff || isSpeedButtonDisabled}
            />
          </div>
          <div className={styles.equalButtonWrapper}>
            <Button
              label="ออกจากการควบคุม"
              className={`p-button-danger ${styles.equalButton}`}
              disabled={isExitDisabled}
              onClick={handleExit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlTower;
