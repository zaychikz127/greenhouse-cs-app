import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>ตั้งค่ารหัสผ่านใหม่</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">รหัสผ่านใหม่</label>
                    <InputText id="password" type='password' className={styles.input} />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="ConfirmPassword">กรอกรหัสผ่านใหม่อีกครั้ง</label>
                    <InputText id="ConfirmPassword" type='password' className={styles.input} />
                </div>

                <div className={styles.submitButtonWrapper}>
                    <Button
                        label="ยืนยัน"
                        className={styles.submitButton}
                    />
                </div>

                <div className={styles.footer}>
                    <Button
                        label="ยกเลิก"
                        className={styles.backButton}
                        severity="secondary"
                        onClick={() => navigate('/login')}
                    />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
